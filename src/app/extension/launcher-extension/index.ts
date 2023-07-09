import molecule from "@dtinsight/molecule";
import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { EDITOR_ACTION_LAUNCH, launchConsolePanel } from "./base";

export class LauncherExtension implements IExtension {
  id: string = "";
  name: string = "";
  consoleIds: UniqueId[];

  constructor(
    id: string = "LauncherExtension",
    name: string = "Launcher Extension"
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
      ...builtInEditorInitialActions?.value,
    ]);
  }

  onClickAction() {
    molecule.editor.onActionsClick(async (menuId, current) => {
      switch (menuId) {
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
