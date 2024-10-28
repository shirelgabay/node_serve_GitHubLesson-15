
const express = require('express');
const router = express.Router();
const { getAllUsers,getUserById,updateUserById,SignIn, SignUp,addUser} = require('../controlers/users.controler'); 
const auth = require('../middleware/auth.middleware')


// שליפת כל המשתמשים
router.get('/allUsers',auth, getAllUsers);

// התחברות
router.post('/signin',auth, SignIn);

// הרשמה
router.post('/signup',auth, SignUp);

// הוספת משתמש 
router.post('/addUser',auth, addUser);

router.get('/users/:id', auth, getUserById); // קבלת נתוני משתמש לפי ID
router.put('/users/:id', auth, updateUserById); // עדכון נתוני משתמש לפי ID

module.exports = router;
