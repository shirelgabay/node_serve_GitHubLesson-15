const mongoose = require('mongoose');
const User = require('./models/user.models');

const URL_DB = 'mongodb+srv://shirelgabay3:shirelgabay3@mycluster.6zsrb.mongodb.net/store_db?retryWrites=true&w=majority&appName=MyCluster';

exports.connectToDB = async function connectToDB() {
    try {
        await mongoose.connect(URL_DB);
        console.log('mongo success');

        // Create
        try {
            const newUser = new User({
                name: 'x',
                password: 'yyy',
                address: { city: 'bbb', street: 'cvc' },
                comments: ['cgvhbjnkl', 'cvbnm', 'xcvb']
            });
            await newUser.save();
            console.log('SUCCEEDED TO INSERT');
            console.log(newUser);
        } catch (error) {
            console.log('insert failed:', error);
        }

        // Read
        try {
            const arrUsers = await User.find(); // מחזיר את כל המשתמשים מתוך האוסף
            const oneUser = await User.findOne(); // מחזיר את המשתמש הראשון מתוך האוסף
            console.log("oneUser:", oneUser);
            console.log("arrUsers:", arrUsers);
        } catch (error) {
            console.log(error.message);
        }

    } catch (error) {
        console.log('Cannot connect to Mongo server:', error);
    }
};

connectToDB();
