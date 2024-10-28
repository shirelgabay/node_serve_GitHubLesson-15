// middlewares - פונקציות שפועלות על כל בקשה מהלקוח
// מתי - בין הבקשה של הלקוח לתגובה של השרת
// מקבלת 3 פרמטרים - בקשה, תגובה, פונקציה שגורמת להמשיך הלאה
module.exports = function printMethod(req, res, next) {
    req.myMessage = "hello";
  
    console.log('printMethod');
    console.log(req.method);
  
    next();
  }