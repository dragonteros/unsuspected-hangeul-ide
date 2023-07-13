import molecule from "@dtinsight/molecule";

export function handleUpdateTabEditor() {
  molecule.editor.onUpdateTab((tab) => {
    molecule.editor.updateTab({
      ...tab,
      status: "edited",
    });
  });
}
