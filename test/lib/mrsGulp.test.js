var expect = require('chai').expect,
    mrsGulp = require('../../lib/mrsGulp');


describe('#mrsGulp()', function () {

    var options = {
            generalOption: true,
            brand: 'test',
            paths: {
                out: ''
            }
        },
        steroidsGulp;


    it('should be function of length 1', function (done) {
        expect(mrsGulp).to.be.a.function;
        expect(mrsGulp).to.have.length(1);
        done();
    });


    steroidsGulp = mrsGulp(require('gulp')).init(options);


    it('should be an object with own properties load (function), mrsTasks (object), globs (object) and options (object)', function (done) {

        expect(steroidsGulp).to.be.an.object;
        expect(steroidsGulp).to.have.ownProperty('load');
        expect(steroidsGulp.requiredTasks).to.be.a.function;
        expect(steroidsGulp).to.have.ownProperty('mrsTasks');
        expect(steroidsGulp.requiredTasks).to.be.an.object;
        expect(steroidsGulp).to.have.ownProperty('options');
        expect(steroidsGulp.options).to.be.an.object;

        done();

    });

    it('should be able to load a tasks from name.', function (done) {
        steroidsGulp.load({
            'clean': {}
        });
        steroidsGulp.load({
            'test': {}
        }, 'test/_assets/tasks/');

        done();

    });
});





