import molecule from "@dtinsight/molecule";
import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { FILE_SYSTEM } from "../../core/file";
import * as folderTreeController from "./folder-tree-controller";

const clone = <T>(x: T) => JSON.parse(JSON.stringify(x)) as T;

export class FileSystemExtension implements IExtension {
  id: string = "";
  name: string = "";

  constructor(
    id: string = "FileSystemExtension",
    name: string = "File System Extension"
  ) {
    this.id = id;
    this.name = name;
  }

  activate(extensionCtx: IExtensionService): void {
    molecule.folderTree.add(clone(FILE_SYSTEM.tree));
    folderTreeController.handleCreateFolderTree();
    folderTreeController.handleDropFolderTree();
    folderTreeController.handleRemoveFolderTree();
    folderTreeController.handleSelectFolderTree();
    folderTreeController.handleUpdateNameFolderTree();
    molecule.folderTree.toggleAutoSort();
  }

  dispose(extensionCtx: IExtensionService): void {
    molecule.folderTree.toggleAutoSort();
  }
}
