'use strict';

function buildPostDeps(taskName, mrsTasks) {

    var postDeps = [];

    for (var dependantTaskName in mrsTasks) {

        var dependantTask = mrsTasks[dependantTaskName];

        if (taskName !== dependantTask &&
            mrsTasks.hasOwnProperty(dependantTaskName) &&
            dependantTask.src &&
            Array.isArray(dependantTask.dependencies) &&
            dependantTask.dependencies.indexOf(taskName) > -1) {

            postDeps.push(dependantTaskName);
        }
    }

    return postDeps;
}

function watcherFactory(mrsTasks) {

    var watchers = mrsTasks.watch && Array.isArray(mrsTasks.watch.watchers) ? mrsTasks.watch.watchers.slice(0) : [];

    for (var taskName in mrsTasks) {

        if (mrsTasks.hasOwnProperty(taskName)) {

            var task = mrsTasks[taskName],
                sequence;

            if (task.watch == true && ( Array.isArray(task.src) || typeof task.src === 'string' )) {

                if (Array.isArray(task.postTasks)) {
                    sequence = [].concat([taskName], task.postTasks, buildPostDeps(taskName, mrsTasks));
                } else {
                    sequence = [].concat([taskName], buildPostDeps(taskName, mrsTasks));
                }

                watchers.push({
                    _originTaskName: taskName,
                    src: task.src,
                    runSequence: sequence
                });


            }
        }
    }

    return watchers;
}


module.exports = watcherFactory;