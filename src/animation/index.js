export function animation (object) {
  let animations = {}
  let css = ''
  for (let name in object) {
    let block = object[name]
    css += '@keyframes ' + (animations[name] = 'k' + ++count) + '{'
    for (let step in block) {
      let declaration = block[step]
      if (step === 'from' || step === 'to') {
        css += step
      } else {
        css += step + '%'
      }
      css += '{'
      for (let key in declaration) {
        css += propify(key, declaration[key])
      }
      css += '}'
    }
    css += '}'
  }
  document.head.appendChild(
    Object.assign(
      document.createElement('style'),
      { textContent: css }
    )
  )
  return animations
}

let count = 0

function propify (key, value) {
  return key.replace(/[A-Z]/g, '-$&') + ':' + value + ';'
}
