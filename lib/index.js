'use strict';

var $path = require('path'),
    mrsGulp = require('./mrsGulp'),
    util = require('./util'),
    paths = require('./paths'),
    PatternsContainer = require('./PatternsContainer'),
    watcherFactory = require('./watchersFactory'),
    _defaults;


/* PROJECT INFO */
_defaults = util.retrieveProjectInfo($path.join(process.cwd(), 'package.json'));


/* DEFAULT STRUCTURE */
if (!_defaults.paths) {
    paths.addBulk([

        $path.join('config', '$brand', 'i18n'),
        $path.join('config', '$brand', 'resources'),
        $path.join('config', '$brand', 'scss'),
        $path.join('config', '$brand', 'www', 'js'),
        $path.join('config', '$brand', 'www', 'img'),
        $path.join('config', '$brand', 'www', 'css'),
        $path.join('config', '$brand', 'www', 'templates'),
        $path.join('config', '$brand', 'www', 'lib'),

        'lib',

        'merge/resources',
        'merge/www/scss',
        'merge/www/css',
        'merge/www/js',
        'merge/www/img',
        'merge/www/i18n',
        'merge/www/templates',
        'merge/www/lib',

        'resources',

        'src/scss',
        'src/css',
        'src/js',
        'src/img',
        'src/i18n',
        'src/templates',
        'src/lib',
        'src/resources',

        'www/scss',
        'www/css',
        'www/js',
        'www/img',
        'www/i18n',
        'www/templates',
        'www/lib'

    ], [{match: '$brand', replacement: _defaults.brand}]);
    _defaults.paths = paths;
}

/* BUILD SETTINGS */
_defaults.buildSettings = util.retrieveBuildSettings($path.join(paths.config.$brand.root, 'build.json'), _defaults.env);



/* REPLACE PATTERNS */
_defaults.replacements = new PatternsContainer(_defaults.replacements || [{
    match: 'appVersion',
        replacement: _defaults.version
}, {
    match: 'ngCordovaScript',
    replacement: 'ng-cordova'
}, {
    match: 'ngCordovaModule',
    replacement: 'ngCordova'
}]);


/* TASKS */
_defaults.tasks = _defaults.tasks || {

    'default': {
        runSequence: ['clean', 'build']
    },

    'clean': {
        src: [
            paths.resources.files.deep,
            paths.merge.files.deep,
            paths.www.files.deep
        ],
        srcOptions: {
            read: false
        }
    },

    'install': {},
    'install:git-check': {},

    'build': {
        dependencies: [
            'build:lib',
            'build:js',
            'build:style',
            'build:index-files',
            'build:config',
            'build:img',
            'build:i18n',
            'build:templates:cache',
            'build:resources'
        ],
        runSequence: ['build:clean']
    },

    'build:clean': {
        src: ['lib/mrs-app-*/**/*.js',
            '!lib/mrs-app-*/**/*.min.js',
            '**/Thumbs.db',
            '**/.DS_Store'],
        srcOptions: {
            cwd: paths.www.root,
            read: false
        }
    },

    'build:config': {
        dependencies: ['build:config:app', 'build:config:cordova']
    },
    'build:config:app': {
        watch: true,
        src: [
            $path.join(paths.src.root, 'conf.' + _defaults.env + '.json'),
            $path.join(paths.config.$brand.root, 'conf.' + _defaults.env + '.json')
        ],
        dest: paths.www.root,
        basename: 'app.conf'
    },
    'build:config:cordova': {
        watch: true,
        src: $path.join(paths.config.$brand.root, 'config.xml'),
        dest: paths.root,
        basename: 'config'
    },

    'build:i18n': {
        watch: true,
        src: [
            paths.src.i18n.files.deep + '.*(json)',
            paths.config.$brand.i18n.files.deep + '.*(json)'
        ],
        replacements: util.replacements,
        dest: paths.www.i18n.root
    },

    'build:resources': {
        watch: true,
        src: [
            paths.src.resources.files.deep,
            paths.config.$brand.resources.files.deep
        ],
        dest: paths.resources.root,
        minify: _defaults.buildSettings.img.minify
    },

    'build:lib': {
        watch: true,
        src: [
            paths.lib.files.deep,
            paths.src.lib.files.deep,
            paths.config.$brand.www.lib.files.deep
        ],
        dest: paths.www.lib.root
    },

    'build:style': {
        watch: true,
        src: [
            paths.src.scss.files.deep,
            paths.config.$brand.scss.files.deep
        ],
        dest: paths.www.css.root,
        minify: _defaults.buildSettings.style.minify
    },

    'build:img': {
        watch: true,
        src: [
            paths.src.img.files.deep,
            paths.config.$brand.www.img.files.deep
        ],
        dest: paths.www.img.root,
        minify: _defaults.buildSettings.img.minify
    },

    'build:templates': {
        watch: true,
        src: [
            paths.config.$brand.www.templates.files.deep + '.+(html)',
            paths.src.templates.files.deep + '.+(html)'
        ],
        replacements: util.replacements,
        dest: paths.www.templates.root
    },

    'build:templates:cache': {
        dependencies: ['build:templates'],
        watch: true,
        src: paths.www.templates.files.deep + '.+(html)',
        moduleName: 'App',
        dest: paths.www.js.root,
        minify: _defaults.buildSettings.js.minify
    },

    'build:js': {
        watch: true,
        src: [
            paths.src.js.files.deep + '.+(js)',
            paths.config.$brand.www.js.files.deep + '.+(js)'
        ],
        dest: paths.www.js.root,
        minify: _defaults.buildSettings.js.minify
    },

    'build:index-files': {
        watch: true,
        dependencies: ['build:js', 'build:templates', 'build:style'],
        src: [
            $path.join(paths.src.root, 'index.html'),
            $path.join(paths.config.$brand.www.root, 'index.html')
        ],
        dest: paths.www.root,
        replacements: _defaults.replacements,
        inject: {
            src: [
                paths.www.js.files.shallow + '.js',
                paths.www.css.files.shallow + '.css'
            ],
            options: {
                addRootSlash: false
            },
            srcOptions: {cwd: paths.www.root}
        }
    }
    };

/**
 * Returns factory of mrsGulp with extended settings.
 * @param gulp
 * @param options
 * @returns {*}
 */
module.exports = {
    util: util,
    paths: paths,
    PatternsContainer: PatternsContainer,
    watcherFactory: watcherFactory,

    setup: function (gulp, options) {

        options = util.extend(util.retrieveProjectInfo($path.normalize(process.cwd(), 'package.json')), options || {});

        options.paths = options.paths || _defaults.paths;
        options.buildSettings = options.buildSettings || _defaults.buildSettings;
        options.replacements = options.replacements ? new PatternsContainer(options.replacements) : _defaults.replacements;
        options.tasks = options.tasks || _defaults.tasks;

        return mrsGulp(gulp).setup(options);
    }
};
