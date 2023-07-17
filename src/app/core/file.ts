import molecule from "@dtinsight/molecule";
import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { IFolderTreeNodeProps } from "@dtinsight/molecule/esm/model";
import { VirtualFile } from "./io";
import { joinPath, normalizePath } from "./path";
import preimported from "./preimported";

export class File {
  public buffer: Uint8Array;
  public lastModifiedAt: number;

  constructor(initialData: string) {
    this.buffer = new TextEncoder().encode(initialData);
    this.lastModifiedAt = Date.now();
  }

  tryReadAsString(): string | null {
    try {
      return new TextDecoder().decode(this.buffer);
    } catch (error) {
      if (error instanceof TypeError) return null;
      throw error;
    }
  }

  read(numBytes: number, position: number): Uint8Array {
    return this.buffer.slice(position, position + numBytes);
  }
  write(bytes: Uint8Array, position: number): number {
    const writeEnd = bytes.length + position;
    if (this.buffer.length < writeEnd) {
      this.truncate(writeEnd);
    }
    this.buffer.set(bytes, position);

    this.lastModifiedAt = Date.now();
    return bytes.length;
  }
  truncate(size: number) {
    const buffer = new Uint8Array(size);
    buffer.set(this.buffer.slice(0, size));
    this.buffer = buffer;

    this.lastModifiedAt = Date.now();
    return size;
  }
}

export class FileIO {
  private isReadable: boolean;
  private isWritable: boolean;
  private cursor: number;
  private isClosed: boolean;

  constructor(
    protected fs: FileSystem,
    protected fileId: UniqueId,
    public flags: "r" | "w" | "a" | "r+" | "w+" | "a+"
  ) {
    this.isReadable = flags !== "w" && flags !== "a";
    this.isWritable = flags !== "r";
    this.isClosed = false;

    const file = fs.get(fileId);

    // modify file based on flags
    if (flags === "w" || flags === "w+") {
      file.truncate(0);
    }

    this.cursor = 0;
    if (flags === "a" || flags === "a+") {
      this.cursor = file.buffer.length;
    }
  }

  close(): void {
    this.fs.close(this.fileId);
    this.isClosed = true;
  }

  async read(numBytes: number): Promise<ArrayBuffer> {
    if (!this.isReadable)
      throw Error("이 파일은 읽기 가능으로 열리지 않았습니다.");

    const file = this.fs.get(this.fileId);
    if (numBytes < 0) {
      numBytes = file.buffer.byteLength - this.cursor;
    }
    const content = file.read(numBytes, this.cursor).buffer;
    this.cursor += numBytes;
    return content;
  }

  write(bytes: ArrayBuffer): number {
    if (!this.isWritable)
      throw Error("이 파일은 쓰기 가능으로 열리지 않았습니다.");

    const file = this.fs.get(this.fileId);
    const written = file.write(new Uint8Array(bytes), this.cursor);
    this.cursor += bytes.byteLength;
    return written;
  }

  seek(offset: number, whence: "SEEK_SET" | "SEEK_CUR"): number {
    if (this.isClosed) throw Error("닫힌 파일에 접근할 수 없습니다.");
    if (whence === "SEEK_CUR") this.cursor += offset;
    else this.cursor = offset;
    return this.cursor;
  }
  tell(): number {
    if (this.isClosed) throw Error("닫힌 파일에 접근할 수 없습니다.");
    return this.cursor;
  }
  truncate(size?: number): number {
    const file = this.fs.get(this.fileId);
    return file.truncate(size ?? this.cursor);
  }
}

let ID = 0;

class FileSystem {
  tree: IFolderTreeNodeProps;
  openedFiles: Record<UniqueId, File> = {};

  constructor() {
    this.tree = preimported;
  }

  // Internal utilities
  get(fileId: UniqueId): File {
    if (fileId in this.openedFiles) return this.openedFiles[fileId];
    throw Error("닫힌 파일에 접근할 수 없습니다.");
  }
  close(fileId: UniqueId) {
    delete this.openedFiles[fileId];
  }

  findParentOf(path: string) {
    const segments = path.split("/");
    if (segments[0] === ".") segments.shift();
    if (segments.length === 0) return;
    let parent: IFolderTreeNodeProps = this.tree;
    for (const segment of segments.slice(0, -1)) {
      if (parent.children == null) return;
      const entry = parent.children.find((entry) => entry.name === segment);
      if (entry == null) return;
      parent = entry;
    }
    return parent;
  }
  findEntry(path: string): IFolderTreeNodeProps | undefined {
    const segments = path.split("/");
    let parent = this.findParentOf(path);
    if (parent == null) return this.tree;
    if (parent.children == null) return;
    return parent.children.find(
      (entry) => entry.name === segments[segments.length - 1]
    );
  }
  findFile(path: string): File | null {
    path = normalizePath(path);
    const entry = this.findEntry(path);
    if (entry == null || !entry.isLeaf) return null;
    if (entry.id in this.openedFiles) return this.openedFiles[entry.id];
    return new File(entry.data);
  }

  create(path: string, fileType: "File" | "Folder"): IFolderTreeNodeProps {
    path = normalizePath(path);
    const parent = this.findParentOf(path);
    if (parent?.children == null) throw Error("파일을 생성할 수 없습니다.");
    const name = path.split("/").reverse()[0];
    if (parent.children.some((node) => node.name === name))
      throw Error("파일이 이미 존재합니다.");
    const isLeaf = fileType === "File";
    const node: IFolderTreeNodeProps = {
      name,
      id: `file-system-${ID++}`,
      isLeaf,
      fileType,
      location: path,
      children: isLeaf ? undefined : [],
    };
    parent.children.push(node);
    return node;
  }
  remove(path: string): boolean {
    path = normalizePath(path);
    const name = path.split("/").reverse()[0];
    const parent = this.findParentOf(path);
    if (parent?.children == null) return false;
    const idx = parent.children.findIndex((node) => node.name === name);
    if (parent.children[idx].id in this.openedFiles) return false;
    parent.children.splice(idx, 1);
    return true;
  }
  move(path: string, destPath: string): boolean {
    path = normalizePath(path);
    const name = path.split("/").reverse()[0];

    destPath = normalizePath(destPath);
    const dest = this.findEntry(destPath);
    if (dest?.children == null) return false;
    if (dest.children.some((child) => child.name === name)) return false;

    const parent = this.findParentOf(path);
    if (parent?.children == null) return false;

    const idx = parent.children.findIndex((node) => node.name === name);
    const [node] = parent.children.splice(idx, 1);
    dest.children.push(node);
    node.location = joinPath(dest.location ?? "", name);
    return true;
  }
  save(path: string, newContent: string, force = false): boolean {
    path = normalizePath(path);
    let entry = this.findEntry(path);
    if (entry == null) entry = this.create(path, "File");
    if (entry.id in this.openedFiles && !force) return false;
    entry.data = newContent;
    return true;
  }

  // LoadUtils interface
  open(path: string, flags: "r" | "w" | "a" | "r+" | "w+" | "a+") {
    let entry = this.findEntry(path);
    if (entry == null) {
      if (flags === "r" || flags === "r+") {
        throw Error(`지정 경로에 파일이 없습니다: ${path}`);
      }
      entry = this.create(path, "File");
      const parent = this.findParentOf(path);
      molecule.folderTree.add(entry, parent!.id);
    }
    if (!entry.isLeaf) throw Error(`지정 경로에 파일이 없습니다: ${path}`);
    if (entry.id in this.openedFiles)
      throw Error(`이미 사용중인 파일입니다: ${path}`);
    this.openedFiles[entry.id] = new File(entry.data);
    return new FileIO(this, entry.id, flags);
  }
  load(path: string) {
    const file = this.findFile(path);
    if (file == null) throw Error(`지정 경로에 파일이 없습니다: ${path}`);
    const content = file.tryReadAsString();
    if (content == null)
      throw Error(
        `다음 파일이 UTF-8 형식이 아니라 해석할 수 없습니다: ${path}`
      );
    return content;
  }
  isFile(path: string) {
    path = normalizePath(path);
    const entry = this.findEntry(path);
    if (entry == null) throw Error(`지정 경로에 파일이 없습니다: ${path}`);
    return !!entry.isLeaf;
  }
  listdir(path: string): string[] {
    path = normalizePath(path);
    const entry = this.findEntry(path);
    if (entry == null) throw Error(`지정 경로에 디렉토리가 없습니다: ${path}`);
    if (entry.children == null)
      throw Error(`지정 경로는 디렉토리가 아닙니다: ${path}`);
    return entry.children.map((entry) => entry.name || "");
  }
  normalizePath = normalizePath;
  joinPath = joinPath;
}

export const FILE_SYSTEM = new FileSystem();

class FileWrapper extends FileIO {
  constructor(wrapped: FileIO, private localRegistry: Set<UniqueId>) {
    super((wrapped as any).fs, (wrapped as any).fileId, wrapped.flags);
    localRegistry.add(this.fileId);
  }
  close() {
    this.localRegistry.delete(this.fileId);
    super.close();
  }
}
class LoadUtilsWrapper {
  private localRegistry: Set<UniqueId>;
  constructor(
    private stdin: VirtualFile,
    private stdout: VirtualFile,
    private stderr: VirtualFile
  ) {
    this.localRegistry = new Set();
  }
  open(pathOrFd: string | number, flags: "a" | "a+" | "r" | "r+" | "w" | "w+") {
    if (pathOrFd === 0 && flags === "r") return this.stdin;
    if (pathOrFd === 1 && (flags === "w" || flags === "a")) return this.stdout;
    if (pathOrFd === 2 && (flags === "w" || flags === "a")) return this.stderr;
    if (pathOrFd === 0 || pathOrFd === 1 || pathOrFd === 2)
      throw Error("파일 접근 방식이 잘못되었습니다.");
    if (typeof pathOrFd === "number")
      throw Error("다음 파일 기술자에 연결된 파일이 없습니다: " + pathOrFd);
    const file = FILE_SYSTEM.open(pathOrFd, flags);
    return new FileWrapper(file, this.localRegistry);
  }

  load(path: string) {
    return FILE_SYSTEM.load(path);
  }
  isFile(path: string) {
    return FILE_SYSTEM.isFile(path);
  }
  listdir(path: string): string[] {
    return FILE_SYSTEM.listdir(path);
  }
  joinPath(...paths: string[]): string {
    return joinPath(...paths);
  }
  normalizePath(path: string): string {
    return normalizePath(path);
  }

  onDestroy() {
    for (const fileId of this.localRegistry) {
      FILE_SYSTEM.close(fileId);
    }
  }
}
export function getLoadUtils(
  stdin: VirtualFile,
  stdout: VirtualFile,
  stderr: VirtualFile
) {
  return new LoadUtilsWrapper(stdin, stdout, stderr);
}
