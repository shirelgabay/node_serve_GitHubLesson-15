// //middleware שמטפל בשגיאות

// const { Server } = require("socket.io");

// // errorHanding.middleware.js

// exports.pageNotFound = (req, res, next) => {
//     // הוספת שגיאה למערכת
//     console.log(err);
//     next({ status: 404, error: 'Page not found' });
// };

// function errHanding(err,req,res,next){
//     console.log(err);
//     res.status(err.status)
//     .next({error:err.error||"Server error"});
// }


exports.errHanding = errHanding;

// errorHanding.middleware.js

exports.pageNotFound = (req, res, next) => {
    next({ status: 404, error: 'Page not found' });
};

function errHanding(err, req, res, next) {
    console.log(err); // להדפיס את השגיאה לקונסול
    const statusCode = err.status || 500; // קוד סטטוס ברירת מחדל
    res.status(statusCode).json({ error: err.error || "Server error" });
}

exports.errHanding = errHanding;
