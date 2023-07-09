import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { IEditorActionsProps, IPanelItem } from "@dtinsight/molecule/esm/model";
import { Session } from "../../core/session";
import { Console } from "./console";

export const EDITOR_ACTION_LAUNCH_ID = "launchConsole";

export const EDITOR_ACTION_LAUNCH: IEditorActionsProps = {
  id: EDITOR_ACTION_LAUNCH_ID,
  name: "launch",
  icon: "play",
  place: "outer",
  disabled: false,
  title: "실행",
};

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
