# [Bootswatch](https://bootswatch.com/) Bootstrap themes packaged for Meteor

Unless you have a specific reason to add this package (e.g. running inside an intranet without access to the Bootstrap CDN), you're probably better off just including the desired CSS file from the Bootstrap CDN in the `<head>` section of your Meteor HTML:

```html
<link href="https://maxcdn.bootstrapcdn.com/bootswatch/latest/<theme-name>/bootstrap.min.css" rel="stylesheet">
```

None of the themes adds any fonts, so the above line will do, as long as you replace `<theme-name>` with the actual theme name.

If you do decide to add one of these themes into your app, run

```sh
meteor add twbs:bootstrap  # or some other Bootstrap package, if you prefer
meteor add bootswatch:<theme-name>
```


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
* united
* yeti


## Known issues

Because [the themes load the Glyphicons font forcibly](https://github.com/thomaspark/bootswatch/issues/466), you'll see an error in the console that akin to

> Failed to decode downloaded font: .../bootswatch_cerulean/bootswatch/fonts/glyphicons-halflings-regular.woff2

This error is safe to ignore and will hopefully be fixed upstream.


## License and author

Copyright (C) 2015 Dan Dascalescu ([@dandv](https://github.com/dandv)).

This package, Bootstrap, and Bootswatch are published under the MIT license.
