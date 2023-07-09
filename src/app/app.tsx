import molecule, { create, Workbench } from "@dtinsight/molecule";
import "@dtinsight/molecule/esm/style/mo.css";
import { ExplorerExtension } from "./extension/explorer-extension";
import { FileSystemExtension } from "./extension/file-system-extension";
import { KeybindingExtension } from "./extension/keybinding-extension";
import { LauncherExtension } from "./extension/launcher-extension";

const moInstance = create({
  extensions: [
    new ExplorerExtension(),
    new FileSystemExtension(),
    new LauncherExtension(),
    new KeybindingExtension(),
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
});

export default function App() {
  return moInstance.render(<Workbench />);
}
