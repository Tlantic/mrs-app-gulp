var path = require('path' ),
    root = path.resolve(__dirname);


module.exports = {
    dest: path.join( root, 'dest' ),
    src1: path.join(root, 'src1'),
    src2: path.join(root, 'src2')
}
