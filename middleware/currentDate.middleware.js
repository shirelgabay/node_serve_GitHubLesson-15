const addCurrentDate = (req, res, next) => {


        req.currentDate = new Date(); // הוספת התאריך לאובייקט הבקשה

    next(); // המשך לעיבוד הבקשה
};

module.exports = addCurrentDate;


// middlewares - פונקציות שפועלות על כל בקשה מהלקוח
// מתי - בין הבקשה של הלקוח לתגובה של השרת
// מקבלת 3 פרמטרים - בקשה, תגובה, פונקציה שגורמת להמשיך הלאה
