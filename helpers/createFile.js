const { writeFileSync } = require('fs');

const createFile = async(path,name,content) => {
    try {
        writeFileSync(path,content)
        return name   
    } catch (err) {
        return err
    }
}

module.exports = {createFile}