var expect = require('chai').expect,
    $path = require('path'),
    PatternsContainer = require('../../lib/PatternsContainer');


describe('#PatternsContainer()', function () {

    var pcontainer;

    it('should be a constructor function of length 1 that accepts no arguments or only an array as first argument.', function (done) {
        expect(PatternsContainer).to.be.a.function;
        expect(PatternsContainer).to.have.length(1);


        expect(new PatternsContainer()).to.be.instanceOf(PatternsContainer);
        expect(function () {
            return new PatternsContainer([]);
        }).to.not.throw(TypeError);

        done();
    });

    it('should raise TypeError if given patterns parameter is not instance of an array.', function () {
        expect(function () {
            return new PatternsContainer(true);
        }).to.throw(TypeError, 'Argument \'patterns\' must be an array');
    });

    it('should raise TypeError if any pattern consists of a non-string match key or replacement.', function () {
        expect(function () {
            new PatternsContainer([{match: true, replacement: true}]);
        }).to.throw(TypeError, 'Invalid pattern. Match and replacement properties must be strings');
        expect(function () {
            new PatternsContainer([{match: ''}]);
        }).to.throw(TypeError, 'Invalid pattern. Match and replacement properties must be strings');
        expect(function () {
            new PatternsContainer([{match: '', replacement: ''}]);
        }).to.not.throw(TypeError);
    });


    describe('#new PatternsContainer()', function () {

        pcontainer = new PatternsContainer([{match: '', replacement: ''}]);

        describe('#patterns', function () {
            it('should be an array.', function () {
                expect(pcontainer.patterns).to.be.an.array;
                expect(pcontainer.patterns).to.have.length(1);
            });
        });

        describe('#contains()', function () {

            it('should be a function of length 1.', function () {
                expect(pcontainer.contains).to.be.a.function;
                expect(pcontainer.contains).to.have.length(1);
            });

            it('should return true if an match is contained in patterns array.', function () {
                expect(pcontainer.contains('')).to.be.true;
            });

            it('should return false if an match is not contained in patterns array.', function () {
                expect(pcontainer.contains(' ')).to.be.false;
                expect(pcontainer.contains()).to.be.false;
            });

        });

        describe('#add()', function () {
            it('should be a function of length 2.', function () {
                expect(pcontainer.add).to.be.a.function;
                expect(pcontainer.add).to.have.length(2);
            });

            it('should be able to add a new pattern if does not share its match key with any other.', function () {
                expect(pcontainer.add('true', 'false')).to.equal(2);
                expect(pcontainer.add('true', 'false')).to.equal(-1);
                expect(pcontainer.contains('true')).to.be.true;
            });
        });

        describe('#find()', function () {
            it('should be a function of length 1.', function () {
                expect(pcontainer.find).to.be.a.function;
                expect(pcontainer.find).to.have.length(1);
            });

            it('should be able to return a pattern from patterns array or undefined if unexisting.', function () {
                expect(pcontainer.find('')).to.be.deep.equal({match: '', replacement: ''});
                expect(pcontainer.find('not')).to.be.undefined;
            });
        });

        describe('#findIndex()', function () {
            it('should be a function of length 1.', function () {
                expect(pcontainer.findIndex).to.be.a.function;
                expect(pcontainer.findIndex).to.have.length(1);
            });

            it('should be able to return the index of a pattern from patterns array or -1 if unexisting.', function () {
                expect(pcontainer.findIndex('true')).to.be.equal(1);
                expect(pcontainer.findIndex('not')).to.be.equal(-1);
            });
        });

        describe('#remove()', function () {
            it('should be a function of length 1.', function () {
                expect(pcontainer.remove).to.be.a.function;
                expect(pcontainer.remove).to.have.length(1);
            });

            it('should be able to remove and return a pattern from patterns array or undefined if unexisting.', function () {
                expect(pcontainer.remove('')).to.be.deep.equal({match: '', replacement: ''});
                expect(pcontainer.remove('not')).to.be.undefined;
            });
        });

        describe('#replace()', function () {
            it('should be a function of length 1.', function () {
                expect(pcontainer.replace).to.be.a.function;
                expect(pcontainer.replace).to.have.length(1);
            });

            it('should be able to replace all occurences of known patterns within a string.', function () {

                pcontainer.add('#', '1');
                pcontainer.add('are', 'aren\'t');
                expect(pcontainer.replace('Is it true you are n#?')).to.be.equal('Is it false you aren\'t n1?');
            });
        });
    });


});