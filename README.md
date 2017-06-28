# Pure Masonry

Masonry DOM effect with pure JavaScript

**Installation**

```bash
npm install --save-dev pure-masonry
```

**Usage**

**1.**
Add pureMasonry.min.css and pureMasonry.min.js to you project code.

```html
<html>
<head></head>
<body>
	... your html ...

    <script type="text/javascript" src="path/to/pureMasonry.js"></script>
    <script>PureMasonry.init();</script>
</body>
</html>
```

**OR**
If you use `webpack` you can do 
```javascript
require('pure-masonry');
PureMasonry.init();
```

**2.**
Add a container wall to your html body with bricks inside:
(The container's size is under your control, feel free to make it absolute (px) or relative (vw, vh, %).)

```html
<div id="masonry-wall">
	<div class="brick">
		...
	</div>
	(more bricks... )
</div>
```

**! Important !** if you don't specify the options, then you need to use exact html as shown in the example above.

```html
<script>
    var options = {
        container: '#masonry-wall',
        width: 320,
        horizontal_gutter: 5,
        vertical_gutter: 5,
        responsive: true,
        transition: {
            duration: '350ms',
            easing: 'ease'
        },
        advanced: {
            centered: true
        }
    };
    PureMasonry.init(options);
</script>
```

---

**List of options:**

By default you get a whole specturm of them, but you can control the options by passing an object as shown above
<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Default Value</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>container</td>
            <td>#masonry-wall (String)</td>
            <td>Accepts a javascript selector, it uses <code>document.querySelectorAll(selector)</code></td>
        </tr>
        <tr>
            <td>width</td>
            <td>320 (Integer)</td>
            <td>Width of bricks. This will apply to all bricks.</td>
        </tr>
        <tr>
            <td>horizontal_gutter</td>
            <td>5 (Integer)</td>
            <td>horizontal spacing between bricks</td>
        </tr>
        <tr>
            <td>vertical_gutter</td>
            <td>5 (Integer)</td>
            <td>vertical spacing between bricks</td>
        </tr>
        <tr>
            <td>responsive</td>
            <td>true (Boolean)</td>
            <td>The bricks will be initially built to fit the container, but the resize function will not be called on width change (<code>window</code>)</td>
        </tr>
        <tr>
            <td>duration</td>
            <td>350ms (String)</td>
            <td>Trainsition duration, can be 350ms 1s and etc...</td>
        </tr>
        <tr>
            <td>easing</td>
            <td>ease (String)</td>
            <td>Default transition for css (<code>ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(n,n,n,n)</code>). visit https://www.w3schools.com/css/css3_transitions.asp for info</td>
        </tr>
        <tr>
            <td>centered</td>
            <td>true (Boolean)</td>
            <td>If you want the content of the masonry to be centered in the container (uses wi</td>
        </tr>
    </tbody>
</table>

*Please write issues, suggestions so this plugin can be improved*

