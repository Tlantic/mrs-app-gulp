var $path = require('path'),
    root;

/**
 *
 * @param base
 * @param fpath
 * @param patterns
 */
function defineDirStruct(base, fpath, patterns) {

    var name, folderName, basePath;

    if (!fpath) {
        return;
    }

    patterns = patterns || [];
    fpath = $path.normalize(fpath).split($path.sep);
    name = fpath.splice(0, 1)[0];
    folderName = name;

    patterns.forEach(function (p) {
        folderName = folderName.split(p[0]).join(p[1]);
    });

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

    return defineDirStruct(base[name], fpath.join($path.sep), patterns);
}


/**
 *
 * @param path
 * @param patterns
 */
function add(path, patterns) {
    defineDirStruct(root, $path.normalize(path), patterns);
    return root;
}


/**
 *
 * @param paths
 * @param patterns
 * @returns {*}
 */
function addBulk(paths, patterns) {

    paths.forEach(function (p) {
        add(p, patterns);
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