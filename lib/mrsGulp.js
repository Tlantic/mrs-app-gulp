'use strict';

var $path = require('path'),
    extend = require('./util').extend,
    watcherFactory = require('./watchersFactory');


function load(newTasks, relativeTasksPath) {

    var cwd = process.cwd(),
        builtInTasksPath = $path.resolve(__dirname, 'tasks');


    relativeTasksPath = relativeTasksPath ? $path.resolve(cwd, relativeTasksPath) : $path.resolve(cwd, 'tasks');
    this.mrsTasks = extend(this.mrsTasks || {}, newTasks);

    Object.keys(newTasks).forEach(function (taskName) {
        var taskPath = taskName.split(':').join($path.sep),
            taskOptions = this.mrsTasks[taskName] = newTasks[taskName],
            extendOptions = extend(this.options, taskOptions);

        try {
            try {
                require($path.resolve(relativeTasksPath, taskPath))(this, extendOptions);
            } catch (e) {
                require($path.resolve(builtInTasksPath, taskPath))(this, extendOptions);
            }
        } catch (e) {
            throw new Error('Unable to find task ' + taskName + ' within directory ' + relativeTasksPath);
        }


    }, this);


    return this;
}

function setup(options) {
    this.options = options || {};
    return this;
}

function init() {
    var tasks = this.options.tasks || {};
    
    if (!this.options.noWatch) {
        tasks.watch = { watchers: watcherFactory(tasks) };    
    }
    
    // we don't need this anymore, free memory
    delete this.options.tasks;
    
    return this.load(tasks);
}

function decorator(gulp) {

    var fnTask = gulp.task;

    function _task(name, task) {

        if (arguments.length < 3 && typeof task === 'function') {
            task(this, extend(this.mrsTasks[name], this.options));
        } else {
            fnTask.apply(this, arguments);
        }
    }


    gulp.setup = setup;
    gulp.load = load;
    gulp.init = init;
    gulp.task = _task; 

    return gulp;
}


module.exports = decorator;
