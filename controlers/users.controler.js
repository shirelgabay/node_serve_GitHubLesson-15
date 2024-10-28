const bcrypt = require('bcryptjs'); 
const {UserModel,generateToken}  = require('../models/user.models');

module.exports = {

    // שליפת כל המשתמשים
    getAllUsers: async (req, res, next) => {
        //רק במידה וזה מנהל תדפיס
        if (req.user_role !== 'admin') {
            return res.status(403).json({ error: 'Only admin can access user data' });
        }
        try {
            const arrUsers = await UserModel.find(); // מחזיר את כל המשתמשים מתוך האוסף
            res.json(arrUsers);
        } catch (error) {
            next({ error: error.message });
        }
    },

 getUserById : async (req, res, next) => {
    const userId = req.params.id;

    // בדיקה אם המשתמש המחובר הוא אותו משתמש
    if (req.user_id !== userId) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const user = await UserModel.findById(userId, '-password'); // הוצאת שדה הסיסמא
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        next({ error: error.message, status: 500 });
    }
},
 updateUserById : async (req, res, next) => {
    const userId = req.params.id;

    if (req.user_id !== userId) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next({ error: error.message, status: 500 });
    }
},

    // התחברות
    SignIn: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email: email }); // חיפוש משתמש לפי אימייל בדטהבייס
            if (!user) {
                return next({ status: 401, error: "Failed Login" });
            }

            // בדיקת הסיסמא המוצפנת
            const result = await bcrypt.compare(password, user.password); // השוואת סיסמאות

            if (result) {
                const token = generateToken(user)//נוצר טוקן עם הרשאות הלקוח
                user.password = '****';
                return res.json({user,token});
            }
            else {
                return next({ error: 'Failed Login', status: 401 })
            }
        } catch (error) {
            next({ error: error.message });
        }
    },

   // הרשמה
   SignUp: async (req, res, next) => {
    const { email, password, name, phone } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email: email.toUpperCase() });
        if (existingUser) {
            return next({ status: 400, error: "שם המשתמש תפוס" });
        }

        const newUser = new UserModel({
            name,
            email: email.toUpperCase(),
            phone,
            password // הסיסמה תעבור הצפנה אוטומטית במודל
        });

        await newUser.save(); // שמירה במסד הנתונים
        res.status(201).json(newUser); // מחזירים את המשתמש החדש
    } catch (error) {
        next({ error: error.message, status: 400 });
    }
},


    // הוספת משתמש
    addUser: async (req, res, next) => {
        try {
            const newUser = new UserModel(req.body);
            await newUser.save(); // שמירה על המשתמש במסד הנתונים
             const token = generateToken(newUser)
            res.status(201).json({user:newUser,token});
        } catch (error) {
            next({ error: error.message, status: 400 });
        }
    }
};
