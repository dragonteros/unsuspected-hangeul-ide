import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import * as editorController from "./editor-controller";
import * as editorTreeController from "./editor-tree-controller";

export class ExplorerExtension implements IExtension {
  id: string = "";
  name: string = "";

  constructor(
    id: string = "ExplorerExtension",
    name: string = "Explorer Extension"
  ) {
    this.id = id;
    this.name = name;
  }

  activate(extensionCtx: IExtensionService): void {
    editorTreeController.handleCloseEditorTree();
    editorTreeController.handleCloseAllEditorTree();
    editorTreeController.handleCloseOthersEditorTree();
    editorTreeController.handleCloseSavedEditorTree();
    editorTreeController.handleSaveAllEditorTree();

    editorController.handleCloseAllEditor();
    editorController.handleCloseOtherEditor();
    editorController.handleCloseToLeftEditor();
    editorController.handleCloseToRightEditor();
    editorController.handleCloseTabEditor();
    editorController.handleUpdateTabEditor();
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
