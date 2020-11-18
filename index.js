function h (...args) {
  if (!isProps(args[1])) {
    args.splice(1, 0, {});
  }
  let element = document.createElement(args[0]);
  for (let name in args[1]) {
    let value = args[1][name];
    if (/^(checked|disabled|selected)$/.test(name)) {
      if (value) {
        element.setAttribute(name, '');
      }
    } else if (/^on/.test(name) && typeof value === 'function') {
      element.setAttribute(name, '//' + ++count);
      element[name] = function (event) {
        value(event);
        dispatchEvent(new Event('h'));
      };
    } else {
      element.setAttribute(name, value);
    }
  }
  append(element, args.slice(2));
  return element
}

function append (parent, children) {
  for (let child of children) {
    if (Array.isArray(child)) {
      append(parent, child);
    } else if (child instanceof Node) {
      parent.appendChild(child);
    } else {
      parent.appendChild(document.createTextNode(child ?? ''));
    }
  }
}

function div (...args) {
  return h('div', ...args)
}

function span (...args) {
  return h('span', ...args)
}

function p (...args) {
  return h('p', ...args)
}

function br (...args) {
  return h('br', ...args)
}

function b (...args) {
  return h('b', ...args)
}

function i (...args) {
  return h('i', ...args)
}

function u (...args) {
  return h('u', ...args)
}

function form (...args) {
  return h('form', ...args)
}

function label (...args) {
  return h('label', ...args)
}

function textarea (...args) {
  return h('textarea', ...args)
}

function select (...args) {
  return h('select', ...args)
}

function input (...args) {
  return h('input', ...args)
}

function button (...args) {
  return h('button', ...args)
}

function img (...args) {
  return h('img', ...args)
}

function table (...args) {
  return h('table', ...args)
}

function thead (...args) {
  return h('thead', ...args)
}

function tr (...args) {
  return h('tr', ...args)
}

function th (...args) {
  return h('th', ...args)
}

function td (...args) {
  return h('td', ...args)
}

let count = 0;

function isProps (value) {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
}

function patch (previous, next) {
  if (!previous.isEqualNode(next)) {
    if (previous.nodeName !== next.nodeName) {
      previous.parentNode.replaceChild(next, previous);
    } else if (previous.nodeType === Node.TEXT_NODE) {
      if (previous.textContent !== next.textContent) {
        previous.textContent = next.textContent;
      }
    } else if (previous.nodeType === Node.ELEMENT_NODE) {
      for (let { name, value } of next.attributes) {
        if (previous.getAttribute(name) !== value) {
          previous.setAttribute(name, value);
          if (/^on/.test(name)) {
            previous[name] = next[name];
          }
        }
      }
      for (let { name } of [...previous.attributes]) {
        if (!next.hasAttribute(name)) {
          previous.removeAttribute(name);
        }
      }
      let nodesA = [...previous.childNodes];
      let nodesB = [...next.childNodes];
      let a = nodesA.length;
      let b = nodesB.length;
      if (a < b) {
        for (let i = a; i < b; i++) {
          previous.appendChild(nodesB[i]);
        }
      } else if (b < a) {
        for (let i = b; i < a; i++) {
          previous.removeChild(nodesA[i]);
        }
      }
      let c = Math.min(a, b);
      for (let i = 0; i < c; i++) {
        patch(nodesA[i], nodesB[i]);
      }
    }
  }
}

function bind (root, render) {
  ready(function () {
    if (typeof root === 'string') {
      root = document.querySelector(root);
    }
    if (!bindings) {
      bindings = new Map();
    }
    bindings = new Map(bindings).set(root, render);
    update();
  });
}

function unbind (node) {
  while (node !== document) {
    if (bindings.has(node)) {
      bindings = new Map(bindings);
      bindings.delete(node);
      break
    }
    node = node.parentNode;
  }
}

function update () {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(function () {
    for (let [root, render] of bindings.entries()) {
      let next = root.cloneNode();
      append(next, [render()]);
      patch(root, next);
    }
  });
}

let bindings;
let frame;

addEventListener('h', update);

function ready (callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    addEventListener('DOMContentLoaded', callback);
  }
}

function style (object) {
  let styles = {};
  let rules = '';
  for (let name in object) {
    let declaration = object[name];
    let rule = '.' + (styles[name] = 's' + ++count$1) + '{';
    for (let key in declaration) {
      let value = declaration[key];
      if (typeof value === 'object') {
        let sub = '.' + styles[name] + ':' + key + '{';
        for (let subKey in value) {
          sub += propify(subKey, value[subKey]);
        }
        sub += '}';
        rules += sub;
      } else {
        rule += propify(key, value);
      }
    }
    rule += '}';
    rules += rule;
  }
  document.head.appendChild(
    Object.assign(
      document.createElement('style'),
      { textContent: rules }
    )
  );
  return styles
}

let count$1 = 0;

function propify (key, value) {
  return key.replace(/[A-Z]/g, '-$&') + ':' + value + ';'
}

function animation (object) {
  let animations = {};
  let css = '';
  for (let name in object) {
    let block = object[name];
    css += '@keyframes ' + (animations[name] = 'k' + ++count$2) + '{';
    for (let step in block) {
      let declaration = block[step];
      if (step === 'from' || step === 'to') {
        css += step;
      } else {
        css += step + '%';
      }
      css += '{';
      for (let key in declaration) {
        css += propify$1(key, declaration[key]);
      }
      css += '}';
    }
    css += '}';
  }
  document.head.appendChild(
    Object.assign(
      document.createElement('style'),
      { textContent: css }
    )
  );
  return animations
}

let count$2 = 0;

function propify$1 (key, value) {
  return key.replace(/[A-Z]/g, '-$&') + ':' + value + ';'
}

export { animation, append, b, bind, br, button, div, form, h, i, img, input, label, p, select, span, style, table, td, textarea, th, thead, tr, u, unbind, update };
//# sourceMappingURL=index.js.map
