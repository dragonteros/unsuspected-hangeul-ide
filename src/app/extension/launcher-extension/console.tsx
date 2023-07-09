import React from "react";
import { Session } from "../../core/session";
import Xterm from "./xterm";

type ConsoleProps = {
  session: Session;
};

export function Console(props: ConsoleProps) {
  const xtermRef: any = React.useRef(null);

  React.useEffect(() => {
    if (xtermRef.current?.terminal) {
      props.session.attach(xtermRef.current.terminal);
    }
    return () => props.session.detach();
  }, []);

  return (
    <Xterm
      ref={xtermRef}
      onData={(data) => {
        const code = data.charCodeAt(0);
        if (code === 4) {
          props.session.write([{ type: "end-of-document" }]);
          props.session.stdin.write([{ type: "end-of-document" }]);
          return;
        }
        if (code === 13) {
          data = "\r\n";
        } else if (code === 10 || code === 9) {
          // printable
        } else if (code < 32) {
          return; // Control characters
        } else if (code === 127) {
          props.session.write([{ type: "backspace" }]);
          props.session.stdin.write([{ type: "backspace" }]);
          return;
        }
        props.session.write([{ type: "ordinary", data }]);
        props.session.stdin.write([{ type: "ordinary", data }]);
      }}
    />
  );
}
