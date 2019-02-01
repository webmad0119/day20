require('dotenv').config()

//remember to access every value via its key name plus process.env
console.log(process.env.DBPASSWORD)
console.log(process.env.HASKEYCOMPLEXITY)

let mongoConnection = `mongodb://localhost:27017/${process.env.PROJECTDB}`

console.log(mongoConnection)