import molecule from "@dtinsight/molecule";
import { IFolderTreeNodeProps } from "@dtinsight/molecule/esm/model";
import { FILE_SYSTEM } from "../../core/file";
import { transformToEditorTab } from "../common";

const clone = <T>(x: T) => JSON.parse(JSON.stringify(x)) as T;

export function handleCreateFolderTree() {
  molecule.folderTree.onCreate((fileType, id) => {
    const name = fileType === "File" ? "새 파일.pbhhg" : "새 디렉토리";

    if (id == null) return;
    if (fileType === "RootFolder") return;
    const referee = molecule.folderTree.get(id);
    if (referee?.location == null) return;
    let segments = referee?.location.split("/");

    if (referee.fileType === "File") {
      segments.splice(-1, 1, name);
    } else {
      segments.push(name);
    }
    try {
      const node = clone(FILE_SYSTEM.create(segments.join("/"), fileType));
      node.isEditable = true;
      molecule.folderTree.add(node, id);
    } catch (error) {
      console.error(error);
      return;
    }
  });
}

export function handleDropFolderTree() {
  molecule.folderTree.onDropTree((source, target) => {
    const moved = FILE_SYSTEM.move(
      source.location ?? "",
      target.location ?? ""
    );
    if (!moved) return;

    molecule.folderTree.remove(source.id);
    molecule.folderTree.add(source, target.id);
  });
}

export function handleRemoveFolderTree() {
  molecule.folderTree.onRemove((id) => {
    const node = molecule.folderTree.get(id);
    if (node?.location == null) return;

    const removed = FILE_SYSTEM.remove(node.location);
    if (!removed) return;

    molecule.folderTree.remove(id);
  });
}

export function handleSelectFolderTree() {
  molecule.folderTree.onSelectFile((file: IFolderTreeNodeProps) => {
    molecule.editor.open(transformToEditorTab(file));
  });
}

function revertName(file: IFolderTreeNodeProps) {
  const segments = file.location!.split("/");
  file.name = segments[segments.length - 1];
  molecule.folderTree.update(file);
}

export function handleUpdateNameFolderTree() {
  molecule.folderTree.onUpdateFileName((file) => {
    if (file.location == null) return revertName(file);
    if (file.name === "") return revertName(file);
    const parent = FILE_SYSTEM.findParentOf(file.location);
    if (parent?.children?.some((child) => child.name === file.name))
      return revertName(file);

    const entry = FILE_SYSTEM.findEntry(file.location);
    if (entry == null) return revertName(file);

    entry.name = file.name;

    const segments = file.location.split("/");
    entry.location = [...segments.slice(0, -1), file.name].join("/");

    molecule.folderTree.update(clone(entry));
  });
}
