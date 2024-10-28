 const Book = require('../models/book.models'); 

// קבלת כל הספרים
exports.getAllBooks = async (req, res, next) => {
    if (req.user_role !== 'admin') {
        return next({ status: 403, error: "Only admin can access all books" });
    }

    try {
        const books = await Book.find(); // שואל את המסד נתונים לקבלת כל הספרים
        res.json(books); // מחזיר את הרשימה כתגובה
    } catch (error) {
        next({ error: error.message, status: 500 }); 
    }
};

// קבלת ספר לפי ID
exports.getAllBooksById = async (req, res, next) => {
    if (req.user_role !== 'admin') {
        return next({ status: 403, error: "Only admin can access book by ID" });
    }
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return next({ status: 404, error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        next({ error: error.message, status: 500 }); 
    }
};
//הוספה ספר
exports.AddBooks = async (req, res, next) => {
    const newBook = new Book(req.body);
    
    if (req.user_role !== 'admin') {
        return next({ status: 403, error: "Only admin can add book" });
    }

    console.log(`Book ${newBook.name} added by ${req.user_id}`);

    try { 
        const newBook = new Book(req.body)
        newBook.user_id = req.user_id;
        await newBook.save(); // שמירת הספר במונגו 

        res.status(201).json(newBook); 
    } catch (error) {
        next({ error: error.message, status: 400 }); 
    }
};
 


// עדכון ספר
exports.UpdateBooks = async (req, res, next) => {
    if (req.user_role !== 'admin') {
        return next({ status: 403, error: "Only admin can update book" });
    }
    try {
        const bookId = req.params.id; // קבלת ה-ID מהפרמטרים של הבקשה
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true }); // עדכון הספר

        if (!updatedBook) {
            return next({ status: 404, error: 'Book not found' }); // החזר אם הספר לא נמצא
        }

        res.json(updatedBook); // החזרת הספר המעודכן
    } catch (error) {
        next({ error: error.message, status: 500 }); 
    }
};



// מחיקת ספר
exports.DeleteBook = async (req, res, next) => {
    if (req.user_role !== 'admin') {
        //403 - שגיאה בהרשאה
        return next({ status: 403, error: "Only admin can delete book" });
    }
    try {
        const bookId = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return next({ status: 404, error: 'Book not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        next({ error: error.message, status: 400 });
    }
};
// השאלת ספר
exports.loanBook = async (req, res, next) => {
    const { bookId } = req.body;

    // בדיקה אם המשתמש הוא לא מנהל 
    if (!req.user_id) {
        return next({ status: 403, error: "User must be logged in to loan a book" });
    }

    try {
        // בדיקה אם הספר קיים
        const book = await Book.findById(bookId);
        if (!book) {
            return next({ status: 404, error: "Book not found" });
        }

        // הוספת השאלה לספר
        book.loanedBy.push({
            user_id: req.user_id,
            loanedAt: new Date()
        });

        await book.save(); // שמירת השינויים

        res.status(201).json({ message: "Book loaned successfully", book });
    } catch (error) {
        next({ error: error.message, status: 500 });
    }
};


// קבלת ספרים לפי קטגוריה
exports.getBooksByCategory = async (req, res, next) => {
    try {
        const category = req.params.category; // קבלת הקטגוריה מהפרמטרים
        const books = await Book.find({ Categoryarr: category }); // חיפוש ספרים בקטגוריה הזו

        if (books.length === 0) {
            return next({ status: 404, error: 'No books found in this category' });
        }

        res.json(books); // החזרת הספרים שנמצאו
    } catch (error) {
        next({ error: error.message, status: 500 });
    }
};