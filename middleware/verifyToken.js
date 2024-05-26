const jwt = require("jsonwebtoken");
const verifyToken = (req , res , next) => {
const authHeader = req.headers['authorization'];

const token = authHeader && authHeader.split(' ')[1];
if(token == null) return res.status(401).json({message: "Unauthorized"});
jwt.verify(token , process.env.AUTH_ACCESS_TOKEN, (err , user) => {
    if(err) return res.status(403).json({message: "Invalid token"});

    req.user = user.userId;
    next();
});


}

module.exports = verifyToken;