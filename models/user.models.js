const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        uppercase: true, 
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4 
    },
    registrationDate: {
        type: Date,
        default: Date.now // תאריך נוכחי
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // רק ערכים אלה יתקבלו
        default: 'user' // ברירת מחדל היא משתמש רגיל
    }
});

userSchema.pre('save', async function(next) {
    // הדפסה של הסיסמה לפני ההצפנה
    console.log('Before hashing:', this.password);

    // הצפנת סיסמא
    const newPass = await bcrypt.hash(this.password, 10);
    console.log('After hashing:', newPass); // הדפסה של הסיסמה המוצפנת

    this.password = newPass; // שמירה במסד נתונים
    next();
});


// יצירת המודל
const UserModel = mongoose.model('User', userSchema);

// token מוצפן
function generateToken(user) {
    const key = process.env.JWT_SECRET; // מפתח הסוד להצפנה
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, key);
    
    console.log('Generated Token:', token); // הדפסת הטוקן לקונסול
    return token; 
}

// ייצוא של המודל ופונקציית יצירת הטוקן
module.exports = {
    UserModel,
    generateToken
};

