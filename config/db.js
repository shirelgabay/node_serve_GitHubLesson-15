const mongoose = require('mongoose');

//ערך ברירת מחדלדטה בייס מקומי
const URL_DB = process.env.mongoDB_URL ||'Mongo://localhost:27018/mydb'


//דרך שנייה לייצוא הפונקציה 
exports.connectToDB = async function connectToDB() {
    try {
        await mongoose.connect(URL_DB);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("Cannot connect to MongoDB server", error.message);
    }
};
