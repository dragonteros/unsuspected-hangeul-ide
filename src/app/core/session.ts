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

    import("unsuspected-hangeul")
      .then((pbhhg) => pbhhg.run(filepath, program, [], ioUtils, loadUtils))
      .then((exitCode: number) => {
        this.write([
          {
            type: "ordinary",
            data: `\n[프로그램이 종료되었습니다. 종료 코드: ${exitCode}]`,
          },
        ]);
      })
      .catch((error: Error | string) => {
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
