const {prompt} = require('inquirer')

const readInput = async(message,validateFunc) => {
    const question = [{
        type:"input",
        name:"desc",
        message,
        validate(value) {
            if(validateFunc) return validateFunc(value)
            return true
        }
    }]

    return await prompt(question) 
}

module.exports = {readInput}