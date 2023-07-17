import { Session } from "@/app/core/session";
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
  sessions: Record<UniqueId, Session>;

  constructor(
    id: string = "EditorActionExtension",
    name: string = "Editor Action Extension"
  ) {
    this.id = id;
    this.name = name;
    this.sessions = {};
  }

  activate(extensionCtx: IExtensionService): void {
    this.initUI();
    this.onClickAction();

    molecule.panel.onTabClose((key) => {
      this.sessions[key]?.abortController.abort("패널 닫힘");
      delete this.sessions[key];
    });
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

          const panelId = `console-${fileId}`;
          if (!(panelId in this.sessions)) {
            const [consolePanel, session] = launchConsolePanel(
              panelId,
              filepath,
              current.tab?.data.value
            );
            this.sessions[panelId] = session;
            molecule.panel.open(consolePanel);
          }
          break;
        default:
          break;
      }
    });
  }

  dispose(extensionCtx: IExtensionService): void {
    for (const [panelId, session] of Object.entries(this.sessions)) {
      molecule.panel.remove(panelId);
      session.abortController.abort("확장 비활성화");
    }
  }
}
