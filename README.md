# mrs-app-gulp

## 1. Install
```sh
$ npm install --save-dev https://github.com/Tlantic/mrs-app-gulp.git
```

## 2. Create a `gulpfile.js` at the root of your project

### 2.1 Using default options
```js
var gulp = require('mrs-app-gulp')( require('gulp') ).init();
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

| Task Name                 | Behaviour Description                                             |
| ------------------------- |:-----------------------------------------------------------------:|
| default                   | Runs **clean** and **build** tasks in sequence.                   |
| clean                     | Delete content from fs.                                           |
| install                   | Run **bower install** command.                                    |
| install:git-check         | Verify if git command is present.                                 |
| build                     | Task coordinator.                                                 |
| build:clean               | Delete content from fs.                                           |
| build:config              | Task coordinator.                                                 |
| build:config:app          | Extend and replace content of *json config* files.                |
| build:config:cordova      | Replace content of *cordova config files*.                        |
| build:i18n                | Extend and replace content of *json i18n* files.                  |
| build:resources           | Minify image files.                                               |
| build:lib                 | Copy files.                                                       |
| build:style               | Compile SASS and minify css.                                      |
| build:img                 | Minify image files.                                               |
| build:templates           | Copy and replaces content of template files.                      |
| build:templates:cache     | Creates a cache file of angular templates.                        |
| build:js                  | Minify, replaces and flattens content of js files by directory.   |
| build:index-files         | Injects js and css files in html.                                 |
