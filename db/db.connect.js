const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGODB;

const initializeDB = async()=>{
    await mongoose.connect(mongoUri).then(()=>{
        console.log("Connscted Succesfully");
    }).catch((err)=>{
        throw err;
    })
};

module.exports = { initializeDB };
