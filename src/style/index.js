export function style (object) {
  let styles = {}
  let rules = ''
  for (let name in object) {
    let declaration = object[name]
    let rule = '.' + (styles[name] = 's' + ++count) + '{'
    for (let key in declaration) {
      let value = declaration[key]
      if (typeof value === 'object') {
        let sub = '.' + styles[name] + ':' + key + '{'
        for (let subKey in value) {
          sub += propify(subKey, value[subKey])
        }
        sub += '}'
        rules += sub
      } else {
        rule += propify(key, value)
      }
    }
    rule += '}'
    rules += rule
  }
  document.head.appendChild(
    Object.assign(
      document.createElement('style'),
      { textContent: rules }
    )
  )
  return styles
}

let count = 0

function propify (key, value) {
  return key.replace(/[A-Z]/g, '-$&') + ':' + value + ';'
}
