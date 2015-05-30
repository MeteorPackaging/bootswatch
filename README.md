# [Bootswatch](https://bootswatch.com/) Bootstrap themes packaged for Meteor

* [Demo](https://bootswatch.com)
* [Bootswatch source](https://github.com/thomaspark/bootswatch)

## Installation

Unless you have a specific reason to add this package (e.g. running inside an intranet without access to the Bootstrap CDN), you're probably better off just including the desired CSS file from the Bootstrap CDN in the `<head>` section of your Meteor HTML:

```html
<link href="https://maxcdn.bootstrapcdn.com/bootswatch/latest/<theme-name>/bootstrap.min.css" rel="stylesheet">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.min.js"></script>
```

Just replace `<theme-name>` with the actual theme name.

All themes load the [Glyphicons Halflings](https://glyphicons.com/) font from MaxCDN.

If you do decide to add one of these themes into your app, run

```sh
meteor add bootswatch:<theme-name>
```

You don't need to add a Bootstrap package because the theme already contains the skinned Bootstrap CSS, and it includes the Bootstrap JavaScript and Glyphicons Halflings.


## JavaScript components

Features requiring JavaScript (such as drop-downs) or custom jQuery plugins like Tooltip or Popover should work automatically.
If they don't work in templates other than `body`, make sure to run the initialization code in `Template.<yourtemplate>.rendered`:

```js
Template.foo.rendered = function () {
  this.$('[data-toggle="dropdown"]').dropdown();
  this.$('[data-toggle="tooltip"]').tooltip();
  this.$('[data-toggle="popover"]').popover();
}
```

For performance reasons, [the Tooltip and Popover data-apis are opt-in](http://getbootstrap.com/javascript/#popovers).
Above, we initialize them in the limited scope of the template DOM.


## Theme names

* cerulean
* cosmo
* cyborg
* darkly
* flatly
* journal
* lumen
* [paper](https://bootswatch.com/paper/) - theme that looks closest to @fezVrasta's [Material Design skin](https://atmospherejs.com/fezvrasta/bootstrap-material-design)
* readable
* sandstone
* simplex
* slate
* spacelab
* superhero
* [united](https://bootswatch.com/united/) - looks like Ubuntu
* yeti

If you need more detailed control on the files, or to use `.less`, see [Nemo64's package](https://github.com/Nemo64/meteor-bootstrap).


## Known issues

[The themes load the Glyphicons Halflings font forcibly](https://github.com/thomaspark/bootswatch/issues/466), and there's currently no way to skip loading the font, e.g. if you use Font Awesome.


## License and author

Copyright (C) 2015 Dan Dascalescu ([@dandv](https://github.com/dandv)).

Bootstrap, Bootswatch, as well as this package, are published under the MIT license.
