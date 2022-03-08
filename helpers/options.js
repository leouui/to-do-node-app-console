const {prompt} = require('inquirer')
const {writeDB} = require('./dbActions')
const {readInput} = require('./readInput')

const isCompleted = (c) => c ? "Completed".green : "Pending".red

const renderTask = (index,desc,completedIn = null,renderState,) => `${`${index}. `.green}${desc} ${renderState ? `:: ${isCompleted(completedIn)}` : ""}`

const renderTasks = (tasks,renderState = true) => {
    tasks.forEach(({desc,completedIn},index) =>{
        console.log(renderTask(index + 1,desc,completedIn,renderState))
    })
}

const options = async(value,tasks) => {  
    let taskArr = Object.values(tasks.geTasks)
    switch (value) {
        case 1: {
            const {desc} = await readInput("Description:",(value) =>{
                if(value.trim().length === 0) return "Please enter a value"
                return true
            })
            tasks.createTask(desc)
        } break
        case 2: {
            renderTasks(taskArr)
        } break
        case 3: {
            renderTasks(taskArr.filter(({completedIn}) => completedIn))
        } break
        case 4: {
            renderTasks(taskArr.filter(({completedIn}) => !completedIn))
        } break
        case 5: {
            const choices = taskArr.map(({desc,completedIn,id},i) => ({
                checked:!!completedIn,
                value:id,
                name:renderTask(i + 1,desc,completedIn,false)
            }))
            const {selected} = await prompt([{type: "checkbox", name: "selected", message: "Select:",choices}])
            tasks.completeTasks(selected)

        } break;
        case 6: {
            const choices = taskArr.map(({desc,completedIn,id},i) => ({
                value:id,
                name:renderTask(i + 1,desc,completedIn,false)
            }))
            const {selected} = await prompt([{type: "checkbox", name: "selected", message: "Select:",choices}])
            const {desc} = await readInput(`Are you sure? ${`(Y/N)`.gray}`)
            if(desc.toLowerCase().trim() === "y") tasks.deleteTask(selected)

        } break
    }
    
    await writeDB(tasks)

    return true
}

module.exports = {options}