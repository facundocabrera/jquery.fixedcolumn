# position: sticky + JS fallback to CSS transforms.

## Markup proposed

```html
<!--
  Scrollable area (it could be any ancestor, it's no need to be the direct
  one)
-->
<div class="scrollable">
  <div class="sticky">
    <!-- Fixed column will be here -->
  </div>
  <div class="content">
    <!-- Content bellow the fixed column -->
  </div>
</div>
```

## JS Snippet

```js
$('.sticky').fixedcolumn(); // this will handle all the JS show for you
```
## Browser support

  - IE9, 10, 11 use the fallback
  - Firefox till 28 or 29 use the fallback (the nighly for 28 runs native)
  - Chrome 31 use the fallback (I didn't activate the support manually)
  - Safari 6.1+ for OSX runs native
  - iOS Safari >= Version/7.0 runs native (Safari = Version/6.0 only supports top property)
