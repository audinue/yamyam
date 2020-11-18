# animation

Runtime generated modular animation in JS.

```js
export function animation (object) {}
```

Given

```js
{
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  fadeOut: {
    0: { opacity: 1 },
    100: { opacity: 0 }
  }
}
```

Add new style with the following CSS

```css
@keyframes k1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes k2 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

And return

```js
{
  fadeIn: 'k1',
  fadeOut: 'k2'
}
```
