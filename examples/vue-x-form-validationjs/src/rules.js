export const required = ({ value }) => {
  if (value == null || value.length === 0) return false
}

export const unique = ({ value, key, path, root }) => {
  if (value === '') return
  const grandParent = path.slice(0, -2).reduce((grandParent, key) => grandParent[key], root)
  const currentIndex = path[path.length - 2]
  for (const index of Object.keys(grandParent)) {
    if (index === currentIndex) continue
    if (grandParent[index][key] === grandParent[currentIndex][key]) return false
  }
}

export const domain = ({ value }) => {
  if (value === '') return
  // just for demo
  if (/^https?:\/\/.+$/.test(value) === false) return false
}
