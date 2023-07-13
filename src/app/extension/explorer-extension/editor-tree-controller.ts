import molecule from "@dtinsight/molecule";
import { save } from "../common";

export function handleCloseSavedEditorTree() {
  molecule.editorTree.onCloseSaved((groupId) => {
    const group = molecule.editor.getGroupById(groupId);
    if (group == null) return;
    for (const tab of group.data!) {
      if (tab.status !== "edited") {
        molecule.editor.closeTab(tab.id, groupId);
      }
    }
  });
}

export function handleSaveAllEditorTree() {
  molecule.editorTree.onSaveAll((groupId) => {
    let groups = [];
    if (groupId != null) {
      groups = [molecule.editor.getGroupById(groupId)];
    } else {
      groups = molecule.editor.getState().groups ?? [];
    }
    for (const group of groups) {
      if (group == null) return;
      for (const tab of group.data!) {
        if (tab.status === "edited") {
          save(tab);
        }
      }
    }
  });
}
