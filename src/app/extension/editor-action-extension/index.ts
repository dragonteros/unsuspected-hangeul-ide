import molecule from "@dtinsight/molecule";
import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { launchConsolePanel } from "../../launcher/base";
import { save } from "../common/index";
import { EDITOR_ACTION_LAUNCH, EDITOR_ACTION_SAVE } from "./base";

export class EditorActionExtension implements IExtension {
  id: string = "";
  name: string = "";
  consoleIds: UniqueId[];

  constructor(
    id: string = "EditorActionExtension",
    name: string = "Editor Action Extension"
  ) {
    this.id = id;
    this.name = name;
    this.consoleIds = [];
  }

  activate(extensionCtx: IExtensionService): void {
    this.initUI();
    this.onClickAction();
  }

  initUI() {
    const builtInEditorInitialActions = molecule.builtin.getModule(
      "builtInEditorInitialActions"
    );
    molecule.editor.setDefaultActions([
      { ...EDITOR_ACTION_LAUNCH },
      { ...EDITOR_ACTION_SAVE },
      builtInEditorInitialActions?.value[0],
    ]);
  }

  onClickAction() {
    molecule.editor.onActionsClick(async (menuId, current) => {
      switch (menuId) {
        case EDITOR_ACTION_SAVE.id:
          if (current.tab == null) return;
          save(current.tab);
          break;
        case EDITOR_ACTION_LAUNCH.id:
          const fileId = current.tab?.id;
          if (fileId == null) return;
          const filepath: string = (current.tab as any).location;

          const consolePanel = launchConsolePanel(
            fileId,
            filepath,
            current.tab?.data.value
          );
          if (this.consoleIds.indexOf(consolePanel.id) === -1) {
            this.consoleIds.push(consolePanel.id);
          }
          molecule.panel.open(consolePanel);
          break;
        default:
          break;
      }
    });
  }

  dispose(extensionCtx: IExtensionService): void {
    for (const panelId of this.consoleIds) {
      molecule.panel.remove(panelId);
    }
  }
}
