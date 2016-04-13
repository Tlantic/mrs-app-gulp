var $path = require('path'),
    expect = require('chai').expect,
    util = require('../../lib/util');


describe('#util', function () {

    it('should be function an object.', function (done) {
        expect(util).to.be.an.object;
        done();
    });


    describe('#extend()', function () {

        it('should be a function.', function (done) {
            expect(util.extend).to.be.a.function;
            done();
        });

        it('should not extend in place.', function (done) {
            var src0 = {
                    arr: [1, 2, 3]
                },
                src1 = {
                    arr: [4, 5, 6]
                };

            expect(src0).to.be.deep.equal({
                arr: [1, 2, 3]
            });
            expect(src1).to.be.deep.equal({
                arr: [4, 5, 6]
            });
            done();
        });

        it('should replace arrays and not extend existing ones.', function (done) {
            var src0 = {
                    arr: [1, 2, 3]
                },
                src1 = {
                    arr: [4, 5, 6]
                };

            expect(util.extend(src0, src1)).to.be.deep.equal({
                arr: [4, 5, 6]
            });

            done();
        });

        it('should use OR when comparing strings to extend.', function (done) {
            var src0 = {
                    str: ''
                },
                src1 = {
                    str: 'src1'
                };

            expect(util.extend(src0, src1)).to.be.deep.equal({
                str: 'src1'
            });

            done();
        });

    });

    describe('#loadJSON()', function () {

        var pkgPath = $path.join(process.cwd(), 'package.json'),
            pkgJSON = require(pkgPath);

        it('should be a function of length 2.', function (done) {
            expect(util.loadJSON).to.be.a.function;
            expect(util.loadJSON).to.have.length(2);
            done();
        });

        it('should be able to parse a JSON file.', function (done) {
            expect(util.loadJSON(pkgPath)).to.be.deep.equal(pkgJSON);
            done();
        });

    });
});



