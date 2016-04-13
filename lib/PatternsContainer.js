'use strict';


/**
 *
 * @param patterns
 * @constructor
 */
function PatternsContainer(patterns) {

    if (patterns !== void 0) {

        if (!Array.isArray(patterns)) {
            throw new TypeError('Argument \'patterns\' must be an array');
        }

        if (patterns.some(function (p) {
                return typeof p.match !== 'string' || typeof p.replacement !== 'string';
            })) {
            throw new TypeError('Invalid pattern. Match and replacement properties must be strings');
        }
    }


    this.patterns = patterns || [];
}


/**
 *
 * @type {{patterns: Array, contains: PatternsContainer.contains, find: PatternsContainer.find, findIndex: PatternsContainer.findIndex, add: PatternsContainer.add, remove: PatternsContainer.remove}}
 */
PatternsContainer.prototype = {

    contains: function (match) {
        return !!PatternsContainer.prototype.find.call(this, match);
    },

    find: function (match) {
        return this.patterns.find(function (pattern) {
            return pattern.match === match && typeof pattern.replacement !== void 0;
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

    addBulk: function (matchReplacementePairArray) {

        if (Array.isArray(matchReplacementePairArray)) {

            matchReplacementePairArray.forEach(function (pair) {
                console.log(PatternsContainer.prototype.add.call(this, pair.match, pair.replacement));
            });

        }
    },

    remove: function (match) {
        var idx = PatternsContainer.prototype.findIndex.call(this, match);

        if (idx === -1) {
            return void 0;
        }

        return this.patterns.splice(idx, 1)[0];
    },

    replace: function (str) {

        this.patterns.forEach(function (p) {
            str = str.replace(p.match, p.replacement);
        });

        return str;
    }
};


/**
 *
 * @type {PatternsContainer}
 */
module.exports = PatternsContainer;