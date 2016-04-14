# mrs-app-gulp

## 1. Install
```sh
$ npm install --save-dev https://github.com/Tlantic/mrs-app-gulp.git
```

## 2. Create a `gulpfile.js` at the root of your project

### 2.1 Using default options
```js
var gulp = require(mrs-app-gulp)( require('gulp') ).init();
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

## 3. Tasks
One of the main purposes of this project was to decouple some of the most commonly used tasks across all your different projects by providing a simple way to load tasks from js files and pass the configuration for the task behaviour like you would do with [Grunt](http://gruntjs.com/configuring-tasks).

## 3.1 Configuring Tasks
```js
var options = {
    tasks: {
        'build': {
            /* run in parallel */
            dependencies: [ 'build:js', 'build:img' ],  
            /* run in sequence */
            runSequence: [ 'build:clean' ]
        },
        'build:img': {
            watch: true,
            src: './src/img/**/*.{png,gif,jpg}',
            dest: './dist/img/',
            minify: true
        },
        'build:js': {
            watch: true,
            src: './src/js/**/*.js',
            dest: './dist/js/',
            minify: true
        },
        'build:clean': {
            src: [ '**/Thumbs.db', '**/.DS_Store'],
            srcOptions: {
                cwd: './dist/',
                read: false
            }
        },
    }
};

gulp.init(options);
```

## 3.1 Default Tasks
A set of commonly used tasks are at your disposal.
| Task Name     | Description   |
| ------------- | ------------- |
| default  | Content Cell  |
| clean  | Content Cell  |
| clean  | Content Cell  |
| clean  | Content Cell  |
