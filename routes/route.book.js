
const express = require('express');
const router = express.Router(); // ודאי שהשמות תואמים
const { getAllBooks, getAllBooksById, AddBooks, UpdateBooks, DeleteBook,loanBook,getBooksByCategory } = require('../controlers/books.controler')
const auth = require('../middleware/auth.middleware')


// קבלת כל הספרים
router.get("/",getAllBooks);

// קבלת ספר לפי קוד
router.get("/:id",getAllBooksById);


// הוספת ספר
router.post("/",auth,AddBooks);

// עדכון ספר
router.put("/:id",auth,UpdateBooks);


// מחיקת ספר
router.delete("/:id",auth,DeleteBook);

//השאלת ספר
router.post('/books/loan', loanBook);

// קבלת ספרים לפי קטגוריה
router.get('/category/:category', getBooksByCategory);

module.exports = router; 
