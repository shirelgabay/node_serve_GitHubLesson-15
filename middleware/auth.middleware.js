const jwt = require('jsonwebtoken');

 const auth = (req, res, next) => {
    const { authorization } = req.headers;

  

    const token = authorization.split(' ')[1];
    const key =  process.env.JWT_SECRET; // מפתח הסוד להצפנה

    try {
        const user = jwt.verify(token, key); // בודק את תקינות של הטוקן
        console.log(user);

        req.user_id = user.id;
        req.user_role = user.role;

        return next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }

}

module.exports = auth; 
