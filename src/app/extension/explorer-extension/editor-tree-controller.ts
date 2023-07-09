import molecule from "@dtinsight/molecule";

export function handleCloseEditorTree() {
  molecule.editorTree.onClose((tabId, groupId) => {
    console.log("onclose", tabId, groupId);
  });
}

export function handleCloseAllEditorTree() {
  molecule.editorTree.onCloseAll((groupId) => {
    console.log("oncloseall", groupId);
  });
}

export function handleCloseOthersEditorTree() {
  molecule.editorTree.onCloseOthers((tabId, groupId) => {
    console.log("oncloseothers", tabId, groupId);
  });
}

export function handleCloseSavedEditorTree() {
  molecule.editorTree.onCloseSaved((groupId) => {
    console.log("onclosesaved", groupId);
  });
}

export function handleSaveAllEditorTree() {
  molecule.editorTree.onSaveAll((groupId) => {
    console.log("onsaveall", groupId);
  });
}
