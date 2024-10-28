const mongoose = require('mongoose');


const booksSchema = new mongoose.Schema({
    bookname: {
        type: String,
        required: true,
        unique: true,
        minlength:2,
    },
    price: {
    type: Number,
    required: true
},

Categoryarr: {
    type: [String],
    enum: ['A', 'B', 'C'], // רשימת קטגוריות
    required: true
},
authorData:{
    authorname:  String, 
    phone:  String, 
    email:  String,  
},
loanedBy: [{
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    loanedAt: { type: Date, default: Date.now },
    returnDate: { type: Date, required: false }
}]

})
const BookModel =  mongoose.model('Books',booksSchema);
module.exports = BookModel





