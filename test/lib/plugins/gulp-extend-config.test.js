var expect = require('chai').expect,
    gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    assert = require('stream-assert'),
    extendConfig = require('../../../lib/plugins/gulp-extend-config.js'),
    rm = require('../../_helpers/rm'),
    testPaths = require('../../_assets/paths');


describe(path.basename(__filename, '.test.js'), function () {

    it('should output a file for each streamed filename', function (done) {
        rm(testPaths.dest);
        gulp.src([path.join(testPaths.src1, 'config.json'),
                path.join(testPaths.src2, 'config.json')])
            .pipe(extendConfig())
            .pipe(gulp.dest(testPaths.dest))
            .pipe(assert.end(function () {
                expect(fs.readdirSync(testPaths.dest).length).to.be.equal(1);
                done();
            }));
    });

    it('should extend streamed content in order of arrival ( extend({a:1}, {a:2}) <=> {a:1} )', function (done) {
        rm(testPaths.dest);
        gulp.src([path.join(testPaths.src1, 'config.json'),
                path.join(testPaths.src2, 'config.json')])
            .pipe(extendConfig())
            .pipe(gulp.dest(testPaths.dest))
            .pipe(assert.end(function () {
                fs.readFile(path.join(testPaths.dest, 'config.json'), 'utf8', function (err, data) {
                    if (err) throw err;

                    var obj = JSON.parse(data);

                    expect(obj).to.have.deep.property('0.numbers');
                    expect(obj[0].numbers).to.be.deep.equal([4, 5, 6]);
                    done();
                });

            }));

    });

});
