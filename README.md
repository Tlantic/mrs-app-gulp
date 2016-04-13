# mrs-app-gulp

## 1. Install
```sh
$ npm install --save-dev gulp-cli
```

## 2. Create a `gulpfile.js` at the root of your project

### 2.1 Using default options
```js
var gulp = require(mrs-app-gulp)( require('gulp') );
    
gulp.init();
```

### 2.2 Using custom options
```js
var _gulp = require('gulp'),
    mrsGulp = require(mrs-app-gulp),
    
    paths = mrsGulp.paths,
    replacements = new mrsGulp.PatternsContainer();

replacements.add( '$env', process.env.NODE_ENV );

paths.addBulk([
  'src/css',
  'src/js',
  'src/img',
  'dist/css',
  'dist/js',
  'dist/img',
  'src/$env'
], replacements );
paths.add( 'assets/$env', replacements );

gulp.init({
      paths: paths,
      replacements: replacements.patterns
    });
```
