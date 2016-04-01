'use strict';


/**
 *
 * @param patterns
 * @constructor
 */
function PatternsContainer(patterns) {

    if (patterns !== void 0 && !Array.isArray(patterns)) {
        throw new TypeError('Argument \'patterns\' must be an array');
    }

    this.patterns = patterns;
}


/**
 *
 * @type {{patterns: Array, contains: PatternsContainer.contains, find: PatternsContainer.find, findIndex: PatternsContainer.findIndex, add: PatternsContainer.add, remove: PatternsContainer.remove}}
 */
PatternsContainer.prototype = {

    patterns: [],

    contains: function (match) {
        return !!PatternsContainer.prototype.find.call(this, match);
    },

    find: function (match) {
        return this.patterns.find(function (pattern) {
            return pattern.match === match;
        });
    },

    findIndex: function findIndex(match) {
        return this.patterns.findIndex(function (pattern) {
            return pattern.match === match;
        });
    },

    add: function (match, replacement) {

        if (PatternsContainer.prototype.contains.call(this, match)) {
            return -1;
        }

        return this.patterns.push({
            match: match,
            replacement: replacement
        });

    },

    remove: function (match) {
        var idx = PatternsContainer.prototype.findIndex.call(this, match);

        if (idx === -1) {
            return void 0;
        }

        return this.patterns.splice(idx, 1)[0];
    }
};


/**
 *
 * @type {PatternsContainer}
 */
module.exports = PatternsContainer;