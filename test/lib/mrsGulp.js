var expect = require('chai').expect,
    availableTasks = require('../_helpers/available-tasks'),
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


    it('should be function of length 2', function (done) {
        expect(mrsGulp).to.be.a.function;
        expect(mrsGulp).to.have.length(2);
        done();
    });


    steroidsGulp = mrsGulp(require('gulp'), options);


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


});





