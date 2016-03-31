'use strict';

var through = require('through2'),
    path = require('path'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    File = gutil.File,
    PluginError = gutil.PluginError;


const PLUGIN_NAME = 'flatten';

/**
 * Flattens the contents of a directory into a single file named after the dir itself.
 * @returns {*}
 */
function flattendDir() {


    var directories = {};

    /**
     * File content buffering fn
     * @param file
     * @param enc
     * @param callback
     * @returns {*}
     */
    function bufferContents(file, enc, callback) {

        var dirInfo,
            dirName,
            fpath;


        if (file.isNull() || file.isDirectory()) {
            callback();
        }

        if (file.isStream()) {
            return this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }


        fpath = file.relative.split(path.sep);

        if (fpath.length > 1) {
            dirName = fpath[0] + '.' + fpath.pop().split('.').pop();
        } else {
            dirName = fpath.pop();
        }

        dirInfo = directories[dirName] = directories[dirName] ||
            {
                cwd: file.cwd,
                base: file.base,
                path: path.join(file.base, dirName),
                totalFiles: 0,
                content: ''
            };

        dirInfo.content += file.contents.toString();
        ++dirInfo.totalFiles;

        callback();
    }

    /**
     * Finalize stream
     */
    function endStream() {

        for (var dirName in directories) {
            if (directories.hasOwnProperty(dirName)) {

                var dirInfo = directories[dirName];

                //Emit outgoing file and end.
                this.push(new File({
                    cwd: dirInfo.cwd,
                    base: dirInfo.base,
                    path: dirInfo.path,
                    contents: new Buffer(dirInfo.content)
                }));

                gutil.log(PLUGIN_NAME + ': Done with ' + gutil.colors.green(' ' + dirName) + ' (' + dirInfo.totalFiles + ' files).');

            }
        }

        this.emit("end");

    }

    return through.obj(bufferContents, endStream);
}


module.exports = flattendDir;
