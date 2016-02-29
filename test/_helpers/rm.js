
var $fs = require('fs' ),
    $path = require('path');

module.exports = function rm (path) {
    if( $fs.existsSync(path) ) {
        $fs.readdirSync(path).forEach(function(file){
            var curPath = $path.join( path, file);
            if($fs.lstatSync(curPath).isDirectory()) { // recurse
                rm(curPath);
            } else { // delete file
                $fs.unlinkSync(curPath);
            }
        });
        $fs.rmdirSync(path);
    }
};
