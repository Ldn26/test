const jwt  =  require("jsonwebtoken");
require("dotenv").config();

const User = require("../sequelize/models/User");

const ValidationToken = (req , res , next)=> {
   const authHeader = req.headers["authorization"];
   if(!authHeader) {
    return res.status(401).json({error : 'No token Provided'})
   }
   const token = authHeader.split(" ")[1]
   try{
       jwt.verify(token, process.env.JWT_SECRET  ,        (error, decoded) => {
            if (error) {
console.log(error)
              return res.status(401).json({ error: 'Invalid token' });
            }

            req.user = {};
            req.user.id = decoded.id;
            req.user.isAdmin = decoded.isAdmin;
   
            next();
        });
  
    
   }
   catch(err){
    console.log(err)
          res.status(401).json({ message: "Invalid or expired token" });
   }
}

 const  ValidationAdmin   = async(req, res, next) =>{
   const user = await User.findOne({ where: req.user.id });
   if (!user) {
     return res
       .status(403)
       .json({ error: "Vous n'êtes pas autorisé à accéder à cette ressource" });
   }
    if (user.isAdmin !== true) {
      return res
        .status(403)
        .json({ error: "Vous n'êtes pas autorisé à accéder à cette ressource" });
    }
       next();

 };





module.exports = { ValidationToken, ValidationAdmin,  };




