// logCurrentDate.js

const logCurrentDate = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(`תאריך נוכחי: ${req.currentDate}`);
    }
    next(); 
};

module.exports = logCurrentDate;


