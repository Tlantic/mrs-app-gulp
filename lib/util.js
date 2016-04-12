'use strict';
var $fs = require('fs'),
    argv = require('yargs').argv,
    extend = require('extendify')({
        inPlace: false,
        strings: 'or',
        arrays: 'replace'
    });


/**
 * Parses a JSON file.
 * @param path
 * @param enc
 */
function loadJSON(path, enc) {
    return JSON.parse($fs.readFileSync(path, enc || 'utf8'));
}


/* PROJECT SETTINGS */
/**
 * Retrieves a Project Info object.
 * @param path
 * @returns {*}
 */
function retrieveProjectInfo(path) {

    var pkg;

    try {
        pkg = loadJSON(path);
    } catch (e) {
        pkg = {};
    } finally {

        pkg.version = pkg.version || '0.0.0';
        pkg.brand = process.env.MRS_BRAND = argv.brand ? argv.brand : process.env.MRS_BRAND || 'Tlantic';
        pkg.env = argv.env || pkg.env || process.env.NODE_ENV;

        switch (pkg.env) {
            case 'dev':
                process.env.NODE_ENV = pkg.environment = 'development';
                break;
            case 'development':
                process.env.NODE_ENV = pkg.environment = pkg.env;
                pkg.env = 'dev';
                break;
            case 'production':
                process.env.NODE_ENV = pkg.environment = pkg.env;
                pkg.env = 'prd';
                break;
            case 'prd':
                process.env.NODE_ENV = pkg.environment = 'production';
                break;
            case 'test':
                process.env.NODE_ENV = pkg.environment = pkg.env;
                pkg.env = 'tst';
                break;
            case 'tst':
                process.env.NODE_ENV = pkg.environment = 'test';
                break;
            case 'preproduction':
                process.env.NODE_ENV = pkg.environment = pkg.env;
                pkg.env = 'pp';
                break;
            case 'pp':
                process.env.NODE_ENV = pkg.environment = 'preproduction';
                break;
            default:
                process.env.NODE_ENV = pkg.environment = 'development';
                pkg.env = 'dev';
                break;
        }
    }

    return pkg;
}


/* BUILD SETTINGS */
/**
 * Retrieves a Build Settings object used during build.
 * @param path
 * @param env
 * @returns {*}
 */
function retrieveBuildSettings(path, env) {

    var bset;

    env = env || 'dev';

    try {
        bset = loadJSON(path)[env];
    } catch (e) {
        bset = {};
    } finally {
        bset = extend(bset, {
            js: {
                minify: false
            },
            img: {
                minify: false
            },
            style: {
                minify: false
            }

        });
    }

    return bset;
}


module.exports = {

    argv: argv,
    extend: extend,

    loadJSON: loadJSON,
    retrieveProjectInfo: retrieveProjectInfo,
    retrieveBuildSettings: retrieveBuildSettings

};