export function h (...args) {
  if (!isProps(args[1])) {
    args.splice(1, 0, {})
  }
  let element = document.createElement(args[0])
  for (let name in args[1]) {
    let value = args[1][name]
    if (/^(checked|disabled|selected)$/.test(name)) {
      if (value) {
        element.setAttribute(name, '')
      }
    } else if (/^on/.test(name) && typeof value === 'function') {
      element.setAttribute(name, '//' + ++count)
      element[name] = function (event) {
        value(event)
        dispatchEvent(new Event('h'))
      }
    } else {
      element.setAttribute(name, value)
    }
  }
  append(element, args.slice(2))
  return element
}

export function append (parent, children) {
  for (let child of children) {
    if (Array.isArray(child)) {
      append(parent, child)
    } else if (child instanceof Node) {
      parent.appendChild(child)
    } else {
      parent.appendChild(document.createTextNode(child ?? ''))
    }
  }
}

export function div (...args) {
  return h('div', ...args)
}

export function span (...args) {
  return h('span', ...args)
}

export function p (...args) {
  return h('p', ...args)
}

export function br (...args) {
  return h('br', ...args)
}

export function b (...args) {
  return h('b', ...args)
}

export function i (...args) {
  return h('i', ...args)
}

export function u (...args) {
  return h('u', ...args)
}

export function form (...args) {
  return h('form', ...args)
}

export function label (...args) {
  return h('label', ...args)
}

export function textarea (...args) {
  return h('textarea', ...args)
}

export function select (...args) {
  return h('select', ...args)
}

export function input (...args) {
  return h('input', ...args)
}

export function button (...args) {
  return h('button', ...args)
}

export function img (...args) {
  return h('img', ...args)
}

export function table (...args) {
  return h('table', ...args)
}

export function thead (...args) {
  return h('thead', ...args)
}

export function tr (...args) {
  return h('tr', ...args)
}

export function th (...args) {
  return h('th', ...args)
}

export function td (...args) {
  return h('td', ...args)
}

let count = 0

function isProps (value) {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
}
