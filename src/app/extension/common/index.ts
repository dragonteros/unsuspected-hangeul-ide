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
  const saved = FILE_SYSTEM.save(tab.data!.path!, tab.data!.value!);
  if (saved) {
    molecule.folderTree.update({
      id: tab.id,
      data: tab.data!.value,
    });
    molecule.editor.updateTab({ ...tab, status: undefined });
    return;
  }
  molecule.component.Modal.confirm({
    title: "파일을 덮어쓰시겠습니까?",
    content:
      "파일을 연 이후로 파일에 변경 사항이 있습니다. 파일을 덮어쓰면 변경 사항을 잃어버릴 수 있습니다.",
    onOk() {
      const saved = FILE_SYSTEM.save(
        tab.data!.location,
        tab.data!.value!,
        true
      );
      if (saved) {
        molecule.folderTree.update({
          id: tab.id,
          data: tab.data!.value,
        });
        molecule.editor.updateTab({ ...tab, status: undefined });
      }
    },
    onCancel() {},
  });
}
