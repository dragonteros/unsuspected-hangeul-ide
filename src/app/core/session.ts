import { Terminal } from "xterm";

import * as eaw from "eastasianwidth";
import { getLoadUtils } from "./file";
import {
  BufferedReader,
  BufferedWriter,
  Channel,
  ITransferProtocol,
  TransferData,
} from "./io";

export class Session {
  public stdin: ITransferProtocol;
  public abortController: AbortController;

  private previousLines: string = "";
  private activeLine: string = "";
  private terminal?: Terminal;
  constructor(filepath: string, program: string) {
    this.previousLines = `${filepath} 실행 중...\r\n`;
    this.stdin = new Channel();
    const stdout = new Channel();
    const stderr = new Channel();

    stdout.onData((data: TransferData[]) => this.write(data));
    stderr.onData((data: TransferData[]) => this.write(data));

    const _stdin = new BufferedReader(this.stdin);
    const _stdout = new BufferedWriter(stdout);
    const _stderr = new BufferedWriter(stderr);

    const ioUtils = {
      input: () => _stdin.readLine(),
      print: (s: string) => _stdout.writeLine(s),
    };
    const loadUtils = getLoadUtils(_stdin, _stdout, _stderr);

    this.abortController = new AbortController();
    const task = new Promise<string[]>((resolve, reject) => {
      const abortListener = (e: Event) => {
        this.abortController.signal.removeEventListener("abort", abortListener);
        reject(
          e.target != null && "reason" in e.target
            ? e.target.reason
            : "알 수 없는 이유로 중단되었습니다."
        );
      };
      this.abortController.signal.addEventListener("abort", abortListener);

      import("unsuspected-hangeul")
        .then((pbhhg) => pbhhg.main(filepath, program, ioUtils, loadUtils))
        .then(resolve)
        .catch(reject);
    })
      .then((result: string[]) => {
        loadUtils.onDestroy();
        const output = [];
        if (result.length > 1) {
          output.push(
            `\n[!] 주의: 한 줄에 ${result.length}개의 객체를 해석했습니다.`
          );
        }
        output.push("\n결과: " + result.join(" "));
        this.write([
          {
            type: "ordinary",
            data: output.join(""),
          },
        ]);
      })
      .catch((error: Error | string) => {
        loadUtils.onDestroy();
        this.write([
          {
            type: "ordinary",
            data: "\n오류: " + (error instanceof Error ? error.message : error),
          },
        ]);
      });
  }
  write(data: TransferData[]) {
    for (const item of data) {
      if (item.type === "backspace") {
        if (this.activeLine.length === 0) continue;

        const length = eaw.length(this.activeLine.slice(-1));
        this.terminal?.write("\b ");
        for (let i = 0; i < length; i++) this.terminal?.write("\b");

        this.activeLine = this.activeLine.slice(0, -1);
      } else if (item.type === "end-of-document") {
        if (this.activeLine.length) continue;
        this.terminal?.write("^D\r\n");
        this.previousLines += "^D\r\n";
      } else {
        const data = item.data.replace(/(?!\r)\n/g, "\r\n");
        this.terminal?.write(data);
        const linesep = data.lastIndexOf("\r\n");
        if (linesep === -1) {
          this.activeLine += data;
        } else {
          this.previousLines += this.activeLine + data.slice(0, linesep);
          this.activeLine = data.slice(linesep);
        }
      }
    }
  }
  attach(terminal: Terminal) {
    terminal.write(this.previousLines);
    terminal.write(this.activeLine);
    this.terminal = terminal;
  }
  detach() {
    this.terminal = undefined;
  }
}
