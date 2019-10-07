function normalizePath(path) {
  const splitted = path.split(/[/\\]/)
  let hierarchy = []
  const len = splitted.length
  for (let i = 0; i < len; i++) {
    if (!splitted[i]) continue
    if (splitted[i] === '.') continue
    if (splitted[i] === '..' && !hierarchy.pop()) {
      throw 'No more parent node'
    } else hierarchy.push(splitted[i])
  }
  hierarchy.unshift('.')
  return hierarchy.join('/')
}

function joinPath(...paths) {
  return paths.join('/').replace(/[/\\]+/g, '/')
}

export { normalizePath, joinPath }