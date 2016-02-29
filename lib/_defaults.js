'use strict';

var path=require( 'path' ),
    argv=require( 'yargs' ).argv;


function defineDirStruct( root, fpath, patterns ) {

    var name, folderName, rootPath;

    if ( !fpath ) {
        return;
    }

    patterns=patterns || []
    fpath=path.normalize( fpath ).split( path.sep );
    name=fpath.splice( 0, 1 )[ 0 ];


    if ( root[ name ] === void 0 ) {

        folderName=name;
        patterns.forEach( p=>folderName=folderName.split( p[ 0 ] ).join( p[ 1 ] ));

        rootPath=path.join( root.root, folderName );

        root[ name ]={
            root: rootPath,
            files: {
                all: path.join( rootPath, '*' ),
                deep: path.join( rootPath, '**', '/*' ),
            }
        }
    }


    return defineDirStruct( root[ name ], fpath.join( path.sep ), patterns );
}


module.exports=(function () {



    /* options */
    this.brand=argv[ 'brand' ] || '';
    this.env=argv[ 'env' ] || 'dev';
    this.version='0.0.0';

    this.processChangedOnly=false;


    this.js = {
        uglify: false
    };
    this.style =  {
        uglify: false
    };
    this.img = {
        uglify: false
    };


    this.replaces={
        patterns: [ {
            match: 'appVersion',
            replacement: this.version
        }, {
            match: 'ngCordovaScript',
            replacement: 'ng-cordova'
        }, {
            match: 'ngCordovaModule',
            replacement: 'ngCordova'
        } ]
    }

    /* structure root */
    this.paths={
        root: process.cwd()
    };


    /* base paths */
    [

        path.join( 'config', 'brand', 'i18n' ),
        path.join( 'config', 'brand', 'resources' ),
        path.join( 'config', 'brand', 'www', 'js' ),
        path.join( 'config', 'brand', 'www', 'img' ),
        path.join( 'config', 'brand', 'www', 'scss' ),
        path.join( 'config', 'brand', 'www', 'css' ),
        path.join( 'config', 'brand', 'www', 'templates' ),
        path.join( 'config', 'brand', 'www', 'lib' ),

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
        'www/lib',

        'resources',

        'merge/resources',
        'merge/www/scss',
        'merge/www/css',
        'merge/www/js',
        'merge/www/img',
        'merge/www/i18n',
        'merge/www/templates',
        'merge/www/lib',

    ].forEach( function ( fpath ) {
        defineDirStruct( this.paths, path.normalize( fpath ), [ [ 'brand', this.brand ] ] );
    }, this );

    this.paths.src.files.conf=path.join( this.paths.src.root, 'conf.' + this.env );
    this.paths.config.brand.files.conf=path.join( this.paths.config.brand.root, 'conf.' + this.env );



    /* lib */

    /* resources */

    /* blobs */
    this.globs={

        appConfFiles: [
            this.paths.src.files.conf + '.+(json)',
            this.paths.config.brand.files.conf + '.+(json)'
        ],

        cordovaConfFiles: [
            this.paths.config.brand.files.all + '.+(xml)',
        ],

        styleFiles: [
            this.paths.src.scss.files.all,
            this.paths.src.css.files.all,
            this.paths.config.brand.www.scss.files.all,
            this.paths.config.brand.www.css.files.all
        ],

        scssFiles: [
            this.paths.src.scss.files.deep + '.+(scss)',
            this.paths.config.brand.www.scss.files.deep + '.+(scss)'
        ],

        cssFiles: [
            this.paths.src.css.files.deep + '.+(css)',
            this.paths.config.brand.www.css.files.deep + '.+(css)'
        ],

        jsFiles: [
            this.paths.src.js.files.deep + '.+(js)',
            this.paths.config.brand.www.js.files.deep + '.+(js)'
        ],

        imgFiles: [
            this.paths.src.img.files.deep,
            this.paths.config.brand.www.img.files.deep
        ],

        i18nFiles: [
            this.paths.src.i18n.files.all + '.*(json)',
            this.paths.config.brand.i18n.files.all + '.*(json)'

        ],

        templateFiles: [
            this.paths.src.templates.files.deep,
            this.paths.config.brand.www.templates.files.deep
        ],

        libFiles: [
            this.paths.src.lib.files.all,
            this.paths.config.brand.www.lib.files.all
        ],

        indexFiles: [
            path.join( this.paths.src.root, 'index.html' ),
            path.join( this.paths.config.brand.www.root, 'index.html' )
        ],

        resourceFiles: [
            this.paths.src.resources.files.deep,
            this.paths.config.brand.resources.files.deep
        ]

    };


    this.tasks={

        'default': {
            runSequence: [ 'clean', 'build' ]
        },

        'clean': {
            src: [
                this.paths.resources.root,
                this.paths.merge.root,
                this.paths.www.root,
                this.paths.resources
            ]
        },

        'install': {},
        'install:git-check': {},

        'build': {
            runSequence:
                [
                    'build:config',
                    'build:style',
                    'build:js',
                    'build:img',
                    'build:index-files',
                    'build:i18n',
                    'build:templates' ,
                    'build:lib',
                    'build:resources',
                    'build:clean'

                ]
        },

        'build:clean': {
            src: ['lib/mrs-app-*/**/*.js',
                '!lib/mrs-app-*/**/*.min.js',
                '**/Thumbs.db',
                '**/.DS_Store'],
            srcOptions: {
                cwd: this.paths.www.root,
                read: false
            }
        },

        'build:config': {
            dependencies: [ 'build:config:app', 'build:config:cordova' ],
            src: [
                path.join( this.paths.merge.root, 'config.*' ),
                path.join( this.paths.merge.www.root, 'app.conf.*' )
            ],
            srcOptions: {
                base: this.paths.merge.root
            },
            dest: this.paths.root
        },
        'build:config:app': {
            src: this.globs.appConfFiles,
            dest: this.paths.merge.www.root,
            basename: 'app.conf'
        },
        'build:config:cordova': {
            src: this.globs.cordovaConfFiles,
            dest: this.paths.merge.root,
            basename: 'config'
        },

        'build:style': {
            dependencies: [ 'build:style:scss' ],
            src: this.paths.merge.www.css.files.all,
            dest: this.paths.www.css.root,
            minify: this.style.uglify
        },
        'build:style:scss': {
            src: this.globs.scssFiles,
            dest: this.paths.merge.www.scss.root,
            cssDest: this.paths.merge.www.css.root,
        },

        'build:js': {
            dependencies: [ 'build:js:merge', 'build:js:flatten', 'build:templates:cache' ],
            src: this.paths.merge.www.js.files.all,
            dest: this.paths.www.js.root,
            minify: this.js.uglify
        },
        'build:js:flatten': {
            dependencies: [ 'build:js:merge' ],
            src: this.paths.merge.www.js.files.all,
            dest: this.paths.merge.www.js.root,
        },
        'build:js:merge': {
            src: this.globs.jsFiles,
            dest: this.paths.merge.www.js.root
        },

        'build:i18n': {
            dependencies: [ 'build:i18n:merge' ],
            src: this.paths.merge.www.i18n.files.all + '.*(json)',
            dest: this.paths.www.i18n.root
        },
        'build:i18n:merge': {
            src: this.globs.i18nFiles,
            base: this.paths.config.brand.i18n.root,
            dest: this.paths.merge.www.i18n.root
        },

        'build:img': {
            dependencies: [ 'build:img:merge' ],
            src: this.paths.merge.www.img.files.deep,
            dest: this.paths.www.img.root,
            minify: this.img.uglify
        },
        'build:img:merge': {
            src: this.globs.imgFiles,
            dest: this.paths.merge.www.img.root
        },

        'build:templates': {
            dependencies: ['build:templates:merge',  'build:templates:cache' ],
            src: this.paths.merge.www.templates.files.deep,
            dest: this.paths.www.templates.root
        },
        'build:templates:merge': {
            src: this.globs.templateFiles,
            dest: this.paths.merge.www.templates.root

        },
        'build:templates:cache': {
            dependencies: [ 'build:templates:merge' ],
            src:  this.paths.merge.www.templates.files.deep,
            dest: this.paths.merge.www.js.root,
            minify: this.js.uglify
        },

        'build:lib': {
            dependencies: [ 'build:lib:merge' ],
            src: this.paths.merge.www.lib.files.deep,
            dest: this.paths.www.lib.root
        },
        'build:lib:merge': {
            src: this.paths.src.lib.files.deep,
            dest: this.paths.merge.www.lib.root
        },

        'build:index-files': {
            dependencies: [ 'build:index-files:merge' ],
            src: path.join( this.paths.merge.www.root, 'index.html' ),
            dest: this.paths.www.root,
            inject: {
                src: [
                    this.paths.www.js.files.all + '.js',
                    this.paths.www.css.files.all + '.css'
                ],
                srcOptions: { cwd: this.paths.www.root}
            }
        },
        'build:index-files:merge': {
            dependencies: [ 'build:js', 'build:style' ],
            src: this.globs.indexFiles,
            dest: this.paths.merge.www.root
        },


        'build:resources': {
            dependencies: [ 'build:resources:merge' ],
            src: this.paths.merge.resources.files.deep,
            dest: this.paths.resources.root,
            minify: this.img.uglify
        },
        'build:resources:merge': {
            src: this.globs.resourceFiles,
            dest: this.paths.merge.resources.root
        },


        'watch': {
            dependencies: [ 'build', 'watch:start' ]
        },
        'watch:start': {
            tasks: [
                {
                    src: this.globs.appConfFiles.concat( this.globs.cordovaConfFiles ),
                    runSequence: [ 'build:config' ]
                },
                {
                    src: this.globs.scssFiles,
                    runSequence: [ 'build:style', 'build:index-files' ]
                },
                {
                    src: this.globs.jsFiles,
                    runSequence: [ 'build:js', 'build:index-files' ]
                },
                {
                    src: this.globs.imgFiles,
                    runSequence: [ 'build:img' ]
                },
                {
                    src: this.globs.i18nFiles,
                    runSequence: [ 'build:i18n' ]
                },
                {
                    src: this.paths.src.lib.files.deep,
                    runSequence: [ 'build:lib' ]
                },
                {
                    src: this.globs.resourceFiles,
                    runSequence: [ 'build:resources' ]
                },
                {
                    src: this.globs.templateFiles,
                    runSequence: [ 'build:templates' ]
                },
                {
                    src: this.globs.indexFiles,
                    runSequence: [ 'build:index-files' ]
                }
            ]
        }

    };

    return this;
}.call( {} ));
