export function patch (previous, next) {
  if (!previous.isEqualNode(next)) {
    if (previous.nodeName !== next.nodeName) {
      previous.parentNode.replaceChild(next, previous)
    } else if (previous.nodeType === Node.TEXT_NODE) {
      if (previous.textContent !== next.textContent) {
        previous.textContent = next.textContent
      }
    } else if (previous.nodeType === Node.ELEMENT_NODE) {
      for (let { name, value } of next.attributes) {
        if (previous.getAttribute(name) !== value) {
          previous.setAttribute(name, value)
          if (/^on/.test(name)) {
            previous[name] = next[name]
          }
        }
      }
      for (let { name } of [...previous.attributes]) {
        if (!next.hasAttribute(name)) {
          previous.removeAttribute(name)
        }
      }
      let nodesA = [...previous.childNodes]
      let nodesB = [...next.childNodes]
      let a = nodesA.length
      let b = nodesB.length
      if (a < b) {
        for (let i = a; i < b; i++) {
          previous.appendChild(nodesB[i])
        }
      } else if (b < a) {
        for (let i = b; i < a; i++) {
          previous.removeChild(nodesA[i])
        }
      }
      let c = Math.min(a, b)
      for (let i = 0; i < c; i++) {
        patch(nodesA[i], nodesB[i])
      }
    }
  }
}
