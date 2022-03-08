const {v4 : uuidv4} = require('uuid')

class Task {
    constructor(desc,completedIn = null){
        this.id = uuidv4()
        this.desc = desc
        this.completedIn = completedIn
    }
}

module.exports = Task