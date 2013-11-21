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
