const mongoose = require("mongoose")

const uri = "mongodb+srv://santiagopor:lOT5l0ausrEH1oIS@curso-mongodb.mpjlq.mongodb.net/crm-cliente"

const DBConnection = async()=>{
    try{
        await mongoose.connect(uri)
        console.log("DB is connected")
    } catch(error) {
        console.log(error)
        throw new Error("Failed to initialize database")
    }
}

module.exports = DBConnection;