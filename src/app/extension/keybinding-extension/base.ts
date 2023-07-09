import molecule from "@dtinsight/molecule";
//@ts-ignore
import { KeyCode, KeyMod } from "@dtinsight/molecule/esm/monaco";
import {
  Action2,
  KeyChord,
  KeybindingWeight,
} from "@dtinsight/molecule/esm/monaco/api";
import { save } from "../common";

export class SaveKeybindingAction extends Action2 {
  static readonly ID = "SaveKeybinding";

  constructor() {
    super({
      id: SaveKeybindingAction.ID,
      precondition: undefined, // Define some precondition
      f1: false, // Not show in the Command Palette
      keybinding: {
        weight: KeybindingWeight.WorkbenchContrib,
        when: undefined,
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyS),
      },
    });
  }

  run(accessor: any, ...args: any[]) {
    const { current } = molecule.editor.getState();
    if (current?.tab) save(current.tab);
  }
}
