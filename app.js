const dotenv = require('dotenv');
//מאפשר גיש ה לכל המשתנים שמוגדרים ב.env
dotenv.config();


const express = require('express');

const bodyParser = require('body-parser');



const userRoutes = require('./routes/user.route');
const bookRoutes = require('./routes/route.book');
const { errHanding, pageNotFound } = require('./middleware/errorHanding.middleware');
const printMethod = require('./middleware/PrintMethod.middleware');
const auth = require('./middleware/auth.middleware')
const morgan = require('morgan');
const cors = require('cors');
const { connectToDB } = require('./config/db');

// console.log(process.env)
//התחברות למונגו
connectToDB();

const app = express();
const PORT = process.env.PORT || 5000;

// גישה מכל המקורות
app.use(cors());
app.use(express.json()); // תומך בבקשות JSON
app.use(express.urlencoded({ extended: true })); // תומך בבקשות URL
app.use(bodyParser.json());
app.use(printMethod);

// morgan
app.use(morgan('dev'));

// ניתובים
app.use('/users',auth, userRoutes); // נמשתמשים

app.use('/books', bookRoutes); // נספרים

app.get('/', (req, res, next) => {
    res.json({ message: "is running", currentDate: req.currentDate });
});

// טיפול בשגיאות
app.use(pageNotFound);
app.use(errHanding);

app.listen(PORT, () => {
    console.log(`The server link is at http://localhost:${PORT}`);
});
