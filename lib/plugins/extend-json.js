
"use strict";
var through = require('through2' ),
    path = require('path' ),
    fs = require('fs' ),
    gutil = require('gulp-util' ),
    extend = require('extendify' )( {
        inPlace: false,
        arrays: 'replace'
    } ),
    PluginError = gutil.PluginError;


const PLUGIN_NAME = 'extend-i18n';



function extendJson(extensionsPath) {

    if (!extensionsPath) {
        throw new PluginError(PLUGIN_NAME, 'Missing extensionsPath option for ' + PLUGIN_NAME);
    }

    var reExtractFileName = /[^\\]*$/gi,



        stream = through.obj(function(file, enc, callback) {

        var pathExtFile;


        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }



        try {

            pathExtFile = path.join( extensionsPath, file.relative.match( reExtractFileName )[0]);

            if ( fs.existsSync(pathExtFile) ) {
                file.contents = new Buffer(
                    JSON.stringify(
                        extend(
                            JSON.parse( fs.readFileSync( pathExtFile ) ),
                            JSON.parse(file.contents.toString())
                        )
                    )
                );
            }

        } catch (err) {
            return this.emit('error',
                new PluginError(PLUGIN_NAME, 'Error parsing JSON: ' + err + ', file: ' + file.path.slice(file.base.length)));
        }

        callback(null, file);
    });

    // returning the file stream
    return stream;
}

// exporting the plugin main function
module.exports = extendJson;
