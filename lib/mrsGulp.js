'use strict';

var $path = require('path'),
    extend = require('./util').extend;


function _loadTasks(newTasks, relativeTasksPath) {

    var cwd = process.cwd(),
        builtInTasksPath = $path.resolve(__dirname, 'tasks');


    relativeTasksPath = relativeTasksPath || $path.resolve(cwd, 'tasks');

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
            throw new Error("Unable to load task " + taskName + " within tasks directory.");
        }


    }, this);
    return this;
}

function _init(options) {

    this.options = options;

    this.mrsTasks = this.options.tasks || {};
    delete this.options.tasks;

    return this.load(this.mrsTasks);
}

function decorator(gulp, options) {

    var fnTask = gulp.task;

    function _task(name, task) {

        if (arguments.length < 3 && typeof task === 'function') {
            task(this, extend(this.mrsTasks[name], this.options));
        } else {
            fnTask.apply(this, arguments);
        }
    }


    gulp._init = _init;
    gulp.load = _loadTasks;
    gulp.task = _task;

    return gulp._init(options);
}


module.exports = decorator;
