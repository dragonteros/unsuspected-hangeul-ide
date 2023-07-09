export type TransferData =
  | { type: "ordinary"; data: string }
  | { type: "backspace" }
  | { type: "end-of-document" };

export type ITransferProtocol = {
  onData(callback: (data: TransferData[]) => void): void;
  write(data: TransferData[]): void;
};

export class Channel implements ITransferProtocol {
  private callbacks: ((data: TransferData[]) => void)[] = [];

  onData(callback: (data: TransferData[]) => void) {
    this.callbacks.push(callback);
  }
  write(data: TransferData[]) {
    for (const callback of this.callbacks) {
      callback(data);
    }
  }
}

class AsyncEvent<T> {
  private promise: Promise<T>;
  private resolve?: (data: T) => void;
  constructor() {
    this.promise = new Promise<T>((resolve) => (this.resolve = resolve));
  }
  wait() {
    return this.promise;
  }
  notify(data: T) {
    if (this.resolve) {
      this.resolve(data);
    }
  }
}

export class VirtualFile {
  close() {
    throw "NotImplemented";
  }
  async read(numBytes: number): Promise<ArrayBuffer> {
    throw "NotImplemented";
  }
  write(bytes: ArrayBuffer): number {
    throw "NotImplemented";
  }
  seek(offset: number, whence: "SEEK_SET" | "SEEK_CUR"): number {
    throw "NotImplemented";
  }
  tell(): number {
    throw "NotImplemented";
  }
  truncate(size?: number): number {
    throw "NotImplemented";
  }
}
export class BufferedReader extends VirtualFile {
  private buffer: TransferData[] = [];
  private dataIncoming: AsyncEvent<void>;
  constructor(channel: ITransferProtocol) {
    super();
    this.dataIncoming = new AsyncEvent();
    channel.onData((data: TransferData[]) => this.onData(data));
  }
  private async fillBuffer(): Promise<void> {
    if (this.buffer.length) return;
    return await this.dataIncoming.wait();
  }

  async read(numBytes: number): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    let line = "";
    while (numBytes > 0) {
      await this.fillBuffer();

      const item = this.buffer.shift();
      if (item == null) break;
      if (item.type === "end-of-document") break;
      if (item.type === "backspace") {
        line = line.slice(0, -1);
        continue;
      }

      let cursor = 0;
      while (cursor < item.data.length) {
        const delta = item.data[cursor];
        const numBytesDelta = encoder.encode(delta).byteLength;
        if (numBytes < numBytesDelta) {
          numBytes = 0;
          break;
        }
        cursor += 1;
        numBytes -= numBytesDelta;
      }
      line += item.data.slice(0, cursor);

      if (cursor < item.data.length) {
        this.buffer.unshift({
          type: "ordinary",
          data: item.data.slice(cursor),
        });
      }
    }
    return encoder.encode(line).buffer;
  }

  async readLine(): Promise<string | undefined> {
    let line = "";
    while (true) {
      await this.fillBuffer();

      const item = this.buffer.shift();
      if (item == null) break;
      if (item.type === "end-of-document") {
        if (line === "") return undefined;
        break;
      }
      if (item.type === "backspace") {
        line = line.slice(0, -1);
        continue;
      }

      const newlineIdx = item.data.indexOf("\n");
      if (newlineIdx !== -1) {
        line += item.data.slice(0, newlineIdx);
        this.buffer.unshift({
          type: "ordinary",
          data: item.data.slice(newlineIdx + 1),
        });
        break;
      }
      line += item.data;
    }

    if (line.endsWith("\r")) line = line.slice(0, -1);
    return line;
  }

  onData(data: TransferData[]) {
    if (data.length === 0) return;
    const oldEvent = this.dataIncoming;
    this.dataIncoming = new AsyncEvent();
    this.buffer.push(...data);
    oldEvent.notify();
  }
}
export class BufferedWriter extends VirtualFile {
  private writer;
  constructor(channel: ITransferProtocol) {
    super();
    const decoder = new TextDecoderStream();
    decoder.readable.pipeTo(
      new WritableStream<string>({
        write(chunk) {
          channel.write([{ type: "ordinary", data: chunk }]);
        },
        close() {
          channel.write([{ type: "end-of-document" }]);
        },
        abort() {
          channel.write([{ type: "end-of-document" }]);
        },
      })
    );
    this.writer = decoder.writable.getWriter();
  }
  write(bytes: ArrayBuffer): number {
    this.writer.ready.then(() => this.writer.write(bytes));
    return bytes.byteLength;
  }
  writeLine(line: string) {
    const encoder = new TextEncoder();
    this.writer.ready.then(() =>
      this.writer.write(encoder.encode(line + "\n"))
    );
  }
}
