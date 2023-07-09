import { IExtension } from "@dtinsight/molecule/esm/model/extension";
import { IExtensionService } from "@dtinsight/molecule/esm/services";
import { SaveKeybindingAction } from "./base";

export class KeybindingExtension implements IExtension {
  id: string = "";
  name: string = "";

  constructor(
    id: string = "KeybindingExtension",
    name: string = "Keybinding Extension"
  ) {
    this.id = id;
    this.name = name;
  }

  activate(extensionCtx: IExtensionService): void {
    extensionCtx.registerAction(SaveKeybindingAction);
  }

  dispose(extensionCtx: IExtensionService): void {
    throw new Error("Method not implemented.");
  }
}
