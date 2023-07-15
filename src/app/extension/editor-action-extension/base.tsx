import { IEditorActionsProps } from "@dtinsight/molecule/esm/model";

export const EDITOR_ACTION_SAVE_ID = "saveFile";

export const EDITOR_ACTION_SAVE: IEditorActionsProps = {
  id: EDITOR_ACTION_SAVE_ID,
  name: "save",
  icon: "save",
  place: "outer",
  disabled: false,
  title: "저장",
};

export const EDITOR_ACTION_LAUNCH_ID = "launchConsole";

export const EDITOR_ACTION_LAUNCH: IEditorActionsProps = {
  id: EDITOR_ACTION_LAUNCH_ID,
  name: "launch",
  icon: "play",
  place: "outer",
  disabled: false,
  title: "실행",
};
