# style

Runtime generated modular style in JS.

```js
export function style (object) {}
```

Given

```js
{
  link: {
    textDecoration: 'underline',
    hover: {
      color: 'blue'
    }
  },
  message: {
    fontWeight: 'bold'
  }
}
```

Add new style with the following CSS

```css
.s1:hover {
  color: blue;
}
.s1 {
  text-Decoration: underline;
}
.s2 {
  font-Weight: bold;
}
```

And return

```js
{
  link: 's1',
  message: 's2'
}
```
