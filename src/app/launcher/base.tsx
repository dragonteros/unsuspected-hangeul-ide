import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { IPanelItem } from "@dtinsight/molecule/esm/model";
import { Session } from "../core/session";
import { Console } from "./console";

export function launchConsolePanel(
  id: UniqueId,
  filepath: string,
  content: string
): IPanelItem {
  const segments = filepath.split("/");
  const filename = segments[segments.length - 1];
  const session = new Session(filepath, content);

  const panelId = `console-${id}`;
  return {
    id: panelId,
    name: `${filename} 실행`,
    title: `${filename} 실행`,
    renderPane: () => {
      return <Console session={session} />;
    },
  };
}
