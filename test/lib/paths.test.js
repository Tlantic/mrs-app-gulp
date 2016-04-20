var expect = require('chai').expect,
    $path = require('path'),
    paths = require('../../lib/paths');


describe('#root', function () {
    it('should be a string equal to current process cwd.', function (done) {
        expect(paths.root).to.be.a.string;
        expect(paths.root).to.be.equal(process.cwd());
        done();
    });
});

describe('#files', function () {
    it('should have a shallow and deep properties equal to * and **/*.', function (done) {
        expect(paths).to.have.deep.property('files.shallow');
        expect(paths.files.shallow).to.be.equal($path.resolve(process.cwd(), '*'));

        expect(paths).to.have.deep.property('files.deep');
        expect(paths.files.deep).to.be.equal($path.resolve(process.cwd(), '**/*'));
        done();
    });
});

describe('#add()', function () {

    it('should be function of length 2', function (done) {
        expect(paths.add).to.be.a.function;
        expect(paths.add).to.have.length(2);
        done();
    });

    it('should be able to add a path starting at root and every level should have a root and files with shallow and deep properties', function (done) {

        paths.add('./test/lib/plugins');
        paths.add('./test/lib/tasks');

        expect(paths).to.have.deep.property('test');
        expect(paths).to.have.deep.property('test.root');
        expect(paths).to.have.deep.property('test.files.deep');
        expect(paths).to.have.deep.property('test.files.shallow');

        expect(paths).to.have.deep.property('test.lib');
        expect(paths).to.have.deep.property('test.lib.root');
        expect(paths).to.have.deep.property('test.lib.files.deep');
        expect(paths).to.have.deep.property('test.lib.files.shallow');

        expect(paths).to.have.deep.property('test.lib.plugins');
        expect(paths).to.have.deep.property('test.lib.plugins.root');
        expect(paths).to.have.deep.property('test.lib.plugins.files.deep');
        expect(paths).to.have.deep.property('test.lib.plugins.files.shallow');

        expect(paths).to.have.deep.property('test.lib.tasks');
        expect(paths).to.have.deep.property('test.lib.tasks.root');
        expect(paths).to.have.deep.property('test.lib.tasks.files.deep');
        expect(paths).to.have.deep.property('test.lib.tasks.files.shallow');
        done();
    });

    it('should be able to replace path locations based on replace patterns', function (done) {

        paths.add('./test/$vendor/plugins/app$V', [
            {match: '$vendor', replacement: 'mrs'},
            {match: '$V', replacement: '1.0'}
        ]);

        expect(paths).to.have.deep.property('test.$vendor.plugins.app$V');
        expect(paths.test.$vendor.root).to.be.equal($path.resolve(process.cwd(), 'test/mrs/'));
        expect(paths.test.$vendor.plugins.app$V.root).to.be.equal($path.resolve(process.cwd(), 'test/mrs/plugins/app1.0'));
        done();
    });

});

describe('#addBulk()', function () {

    it('should be function of length 2', function (done) {
        expect(paths.addBulk).to.be.a.function;
        expect(paths.addBulk).to.have.length(2);
        done();
    });

    it('should be able to add a paths in bulk starting at root', function (done) {

        paths.addBulk(['./bulk/lib/', './bulk/1/', './bulk/2/', './bulk/1/1']);

        expect(paths).to.have.deep.property('bulk.1.1');
        expect(paths).to.have.deep.property('bulk.2');
        done();
    });

    it('should be able to replace path locations based on replace patterns', function (done) {

        paths.addBulk(['./test/$vendor/plugins/app$V', '/$brand/'], [
            {match: '$vendor', replacement: 'mrs'},
            {match: '$V', replacement: '1.0'},
            {match: '$brand', replacement: 'tlantic'}
        ]);

        expect(paths).to.have.deep.property('test.$vendor.plugins.app$V');
        expect(paths.test.$vendor.root).to.be.equal($path.resolve(process.cwd(), 'test/mrs/'));
        expect(paths.test.$vendor.plugins.app$V.root).to.be.equal($path.resolve(process.cwd(), 'test/mrs/plugins/app1.0'));
        done();
    });

});
