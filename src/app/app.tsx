import molecule, { create, Workbench } from "@dtinsight/molecule";
import "@dtinsight/molecule/esm/style/mo.css";
import { EditorActionExtension } from "./extension/editor-action-extension";
import { ExplorerExtension } from "./extension/explorer-extension";
import { FileSystemExtension } from "./extension/file-system-extension";
import { KeybindingExtension } from "./extension/keybinding-extension";

const moInstance = create({
  extensions: [
    new ExplorerExtension(),
    new FileSystemExtension(),
    new KeybindingExtension(),
    new EditorActionExtension(),
  ],
});

moInstance.onBeforeInit(() => {
  molecule.builtin.inactiveModule("activityBarData");
  molecule.builtin.inactiveModule("builtInExplorerOutlinePanel");
  molecule.builtin.inactiveModule("builtInPanelProblems");
  molecule.builtin.inactiveModule("builtInStatusProblems");
  molecule.builtin.inactiveModule("builtInMenuBarData");
  molecule.builtin.inactiveModule("builtInSearchActivityItem");
  // molecule.builtin.inactiveModule("builtInOutputPanel");
});
moInstance.onBeforeLoad(() => {
  molecule.i18n.setCurrentLocale("ko-KR");
  molecule.layout.toggleMenuBarVisibility();
  molecule.layout.toggleActivityBarVisibility();
  // molecule.layout.togglePanelVisibility();
  molecule.explorer.getState().data[0].toolbar?.shift(); // no toggle vertical
});

export default function App() {
  return moInstance.render(<Workbench />);
}
