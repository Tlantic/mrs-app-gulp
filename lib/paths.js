var $path = require('path'),
    PatternsContainer = require('./PatternsContainer'),
    root;

/**
 *
 * @param base
 * @param fpath
 * @param patternsContainer
 */
function defineDirStruct(base, fpath, patternsContainer) {

    var name, folderName, basePath;

    if (!fpath) {
        return;
    }

    fpath = $path.normalize(fpath).split($path.sep);
    name = fpath.splice(0, 1)[0];

    folderName = patternsContainer.replace(name);


    if (base[name] === void 0) {

        basePath = $path.join(base.root, folderName);
        base[name] = {
            root: basePath,
            files: {
                shallow: $path.join(basePath, '*'),
                deep: $path.join(basePath, '**', '/*')
            }
        }
    }

    return defineDirStruct(base[name], fpath.join($path.sep), patternsContainer);
}

/**
 * Converts pattern arrays on to PatternsContainer instances or throw error if not possible.
 * @param patternsContainer
 * @returns {*}
 */
function initPatternsContainer(patternsContainer) {

    if (patternsContainer instanceof PatternsContainer) {
        return patternsContainer;
    }


    if (patternsContainer == void 0) {
        patternsContainer = new PatternsContainer();
    } else if (Array.isArray(patternsContainer)) {
        patternsContainer = new PatternsContainer(patternsContainer);
    } else {
        throw new TypeError('Invalid patterns argument. Expecting an array or instance or PatternsContainer');
    }

    return patternsContainer;
}

/**
 * Adds a path representation into the object structure
 * @param path
 * @param patternsContainer
 */
function add(path, patternsContainer) {
    defineDirStruct(root, $path.normalize(path), initPatternsContainer(patternsContainer));
    return root;
}


/**
 * Adds a multiple paths representation into the object structure
 * @param paths
 * @param patternsContainer
 * @returns {*}
 */
function addBulk(paths, patternsContainer) {

    patternsContainer = initPatternsContainer(patternsContainer);

    paths.forEach(function (p) {
        add(p, patternsContainer);
    });

    return root;
}


/**
 *
 * @type {{add: add, addBulk: addBulk, root: *, files: {shallow: string, deep: string}}}
 */
module.exports = root = {

    add: add,
    addBulk: addBulk,

    root: process.cwd(),
    files: {
        shallow: $path.join(process.cwd(), '*'),
        deep: $path.join(process.cwd(), '**', '/*')
    }
};