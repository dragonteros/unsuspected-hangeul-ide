export function normalizePath(path: string): string {
  const splitted = path.split(/[/\\]/);
  const hierarchy: string[] = [];
  const len = splitted.length;
  for (let i = 0; i < len; i++) {
    if (!splitted[i]) continue;
    if (splitted[i] === ".") continue;
    if (splitted[i] === ".." && !hierarchy.pop()) {
      throw "No more parent node";
    } else hierarchy.push(splitted[i]);
  }
  hierarchy.unshift(".");
  return hierarchy.join("/");
}

export function joinPath(...paths: string[]): string {
  return paths.join("/").replace(/[/\\]+/g, "/");
}
