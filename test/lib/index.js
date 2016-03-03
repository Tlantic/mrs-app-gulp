var path = require( 'path' ),
    fs = require( 'fs' ),
    expect = require( 'chai' ).expect,
    availableTasks = require('../_helpers/available-tasks' ),
    mrsAppGulp = require( '../../lib/' );


describe( 'mrs-app-gulp', function () {


    it( 'should be function of length 2', function ( done ) {
        expect( mrsAppGulp ).to.be.a.function;
        expect( mrsAppGulp ).to.have.length( 2 );
        done();
    } );

    describe( '#mrsAppGulp()', function () {

        var options = {
                generalOption: true,
            brand: 'test',
                paths: {
                    out: ''
                }
            },
            steroidsGulp;

        steroidsGulp = mrsAppGulp( require('gulp'), options );



        it( 'should be an object with own properties load (function), mrsTasks (object), globs (object) and options (object)', function ( done ) {

            expect( steroidsGulp ).to.be.an.object;
            expect( steroidsGulp ).to.have.ownProperty( 'load' );
            expect( steroidsGulp.requiredTasks ).to.be.a.function;
            expect( steroidsGulp ).to.have.ownProperty( 'mrsTasks' );
            expect( steroidsGulp.requiredTasks ).to.be.an.object;
            expect( steroidsGulp ).to.have.ownProperty( 'options' );
            expect( steroidsGulp.options ).to.be.an.object;

            done();

        } );

        it( 'should load options, globs, paths from defauls and extend with  options', function ( done ) {

            expect( steroidsGulp ).to.have.deep.property('options.env');
            expect( steroidsGulp ).to.have.deep.property('options.brand');
            expect( steroidsGulp ).to.have.deep.property('options.generalOption');
            expect( steroidsGulp ).to.have.deep.property('options.paths.out');
            expect( steroidsGulp.options.brand ).to.be.equal('test');
            done();

        } );

        it( 'should self declare task from lib if present in config', function ( done ) {
            expect( steroidsGulp.tasks ).to.include.keys(availableTasks);
            done();

        } );
    });


    fs.readdirSync( __dirname ).forEach( function ( file ) {

        if ( file !== 'index.js' && !file.startsWith( '_' ) ) {

            describe( '#' + path.basename( file, '.test.js' ), function () {
                require( path.join( __dirname, file ) );

            } );

        }

    } );
} );





