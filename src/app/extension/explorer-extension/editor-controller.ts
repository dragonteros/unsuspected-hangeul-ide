import molecule from "@dtinsight/molecule";

export function handleCloseAllEditor() {
  molecule.editor.onCloseAll((groupId) => {
    console.log("oncloseall", groupId);
  });
}

export function handleCloseOtherEditor() {
  molecule.editor.onCloseOther((tabItem, groupId) => {
    console.log("oncloseother", tabItem, groupId);
  });
}

export function handleCloseToLeftEditor() {
  molecule.editor.onCloseToLeft((tabItem, groupId) => {
    console.log("onCloseToLeft", tabItem, groupId);
  });
}

export function handleCloseToRightEditor() {
  molecule.editor.onCloseToRight((tabItem, groupId) => {
    console.log("onCloseToRight", tabItem, groupId);
  });
}

export function handleCloseTabEditor() {
  molecule.editor.onCloseTab((tabId, groupId) => {
    console.log("onclosetab", tabId, groupId);
  });
}

export function handleUpdateTabEditor() {
  molecule.editor.onUpdateTab((tab) => {
    molecule.editor.updateTab({
      ...tab,
      status: "edited",
    });
  });
}
