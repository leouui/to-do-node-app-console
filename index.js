const {prompt} = require('inquirer')
const {options} = require('./helpers/options')
const {readInput} = require('./helpers/readInput')
const {readDB} = require('./helpers/dbActions')
const Tasks = require('./models/tasks')

require("colors")

const tasks = new Tasks()
const tasksDB = readDB()

if(tasksDB) tasks.setInitialTasks = JSON.parse(tasksDB)

const question = {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
        {value:1,name:`${`${1}.`.green} Create task`},
        {value:2,name:`${`${2}.`.green} Show tasks`},
        {value:3,name:`${`${3}.`.green} Show completed tasks`},
        {value:4,name:`${`${4}.`.green} Show pending tasks`},
        {value:5,name:`${`${5}.`.green} Complete task(s)`},
        {value:6,name:`${`${6}.`.green} Delete task`},
        {value:0, name:`${"0.".green} Exit`}
    ]
}

const validateChoise = (choices,option) => {
    return new Promise((resolve,reject) => {
        const opt = choices.find(({value}) => value === option)
        opt ? resolve(opt) : reject("Ingrese una opcion valida")
    })
}

const app = () => {
    console.clear()

    console.log("=====================\n  Select something   \n=====================\n".green)

    prompt([question])
        .then(({option}) => validateChoise(question.choices,option))
        .then(({value}) => value !== 0 && options(value,tasks))
        .then(isDifrtToZero => isDifrtToZero && readInput(`Press ${`ENTER`.green} to continue`))
        .then(isContinue => isContinue && app())
        .catch(err => console.log(err))
}

app()