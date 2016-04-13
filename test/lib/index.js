var expect = require('chai').expect,
    path = require('path'),
    mrsAppGulp = require('../../lib/mrsGulp'),
    fs = require('fs'),
    directories = [];

fs.readdirSync(__dirname).forEach(function (file) {

    var filePath = path.join(__dirname, file),
        fsStat = fs.statSync(filePath);

    if (fsStat.isFile()) {

        if (file.endsWith('.js') && file !== 'index.js' && !file.startsWith('_')) {
            describe('#' + path.basename(file, '.test.js'), function () {
                require(filePath);

            });
        }

    } else if (fsStat.isDirectory()) {

        if (!file.startsWith('_')) {
            directories.push(filePath);
        }

        }

    } );
directories.forEach(function (d) {

    describe('#' + path.basename(d), function () {
        require(path.join(d));
    });
});







