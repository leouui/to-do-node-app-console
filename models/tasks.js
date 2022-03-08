const Task = require('./task')

class Tasks {
    constructor(){
        this.tasks = {}
    }

    createTask(desc = "") {
        const task = new Task(desc)
        this.tasks = {...this.tasks,[task.id]:task}
    }

    completeTasks(idsArr) {
        Object.values(this.tasks).forEach(({id}) => {
            this.tasks = {
                ...this.tasks,
                [id]:{
                    ...this.tasks[id],
                    completedIn: idsArr.indexOf(id) < 0 ? null : new Date(Date.now()).toDateString() 
                }
            }
        })
    }

    deleteTask(idsArr) {
        idsArr.forEach(id => {
            delete this.tasks[id]
        })
    }

    set setInitialTasks(data) {
        this.tasks = data.tasks
    }

    get geTasks() {
        return this.tasks
    }
}

module.exports = Tasks