const mongoose = require("mongoose")
require("dotenv").config();;

const MONGO_URI = process.env.MONGODB

const initializeDatabase = async () => {
await mongoose
.connect(MONGO_URI)
.then(() => {
    console.log("DataBase is Connected")
})
.catch((error) => {
    console.log("Error connecting Database", error)
})
}

module.exports = initializeDatabase