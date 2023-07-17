import molecule from "@dtinsight/molecule";
import {
  IEditorTab,
  IFolderTreeNodeProps,
} from "@dtinsight/molecule/esm/model";
import { FILE_SYSTEM } from "../../core/file";

export function transformToEditorTab(item: IFolderTreeNodeProps): IEditorTab {
  const tabData: IEditorTab = {
    ...item,
    id: item.id?.toString(),
    data: {
      path: item.location,
      value: item.data,
    },
  };
  return tabData;
}

export function save(tab: molecule.model.IEditorTab) {
  const saved = FILE_SYSTEM.save(tab.data!.path!, tab.data!.value!, true);
  if (saved) {
    molecule.folderTree.update({
      id: tab.id,
      data: tab.data!.value,
    });
    molecule.editor.updateTab({ ...tab, status: undefined });
    return;
  }
}
