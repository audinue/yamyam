export function bind (root, render) {
  ready(function () {
    if (typeof root === 'string') {
      root = document.querySelector(root)
    }
    if (!bindings) {
      bindings = new Map()
    }
    bindings = new Map(bindings).set(root, render)
    update()
  })
}

export function unbind (node) {
  while (node !== document) {
    if (bindings.has(node)) {
      bindings = new Map(bindings)
      bindings.delete(node)
      break
    }
    node = node.parentNode
  }
}

export function update () {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(function () {
    for (let [root, render] of bindings.entries()) {
      let next = root.cloneNode()
      append(next, [render()])
      patch(root, next)
    }
  })
}

import { append } from '../h/index.js'
import { patch } from '../patch/index.js'

let bindings
let frame

addEventListener('h', update)

function ready (callback) {
  if (document.readyState !== 'loading') {
    callback()
  } else {
    addEventListener('DOMContentLoaded', callback)
  }
}
