# h

Creates a DOM node.

```js
export function h (tag) {}
export function h (tag, ...children) {}
export function h (tag, attributes, ...children) {}

export function append (parent, children) {}

export function div (...args) {}
export function span (...args) {}
export function p (...args) {}
export function br (...args) {}
export function b (...args) {}
export function i (...args) {}
export function u (...args) {}
export function form (...args) {}
export function label (...args) {}
export function textarea (...args) {}
export function select (...args) {}
export function input (...args) {}
export function button (...args) {}
export function img (...args) {}
export function table (...args) {}
export function thead (...args) {}
export function tbody (...args) {}
export function tr (...args) {}
export function td (...args) {}
export function th (...args) {}
```

Notes:
1. `undefined` or `null` will be converted to an empty text node.
2. Only `checked`, `selected` and `disabled` boolean attributes are currenty supported.
3. It dispatches `h` event whenever any event handler is called.
