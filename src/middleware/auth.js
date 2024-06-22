const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) =>{
    try {
        let token = req.headers.authorization;
        if(token){  
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);req.userId = user.indexOf;
        }
        else{
            res.status(401).json({message:"unauthrize user"})
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"unauthrize user"})
    }
}
module.exports = auth;