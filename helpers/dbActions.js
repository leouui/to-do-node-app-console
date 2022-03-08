const {createFile} = require('./createFile')
const fs = require('fs')

const path = "./db/data.json"

const readDB = () => {
    if(!fs.existsSync(path)) return null

    return fs.readFileSync(path,{encoding: "utf8"})
}

const writeDB = async(data) => {
    await createFile(path,"data",JSON.stringify(data))
}

module.exports = {readDB,writeDB}