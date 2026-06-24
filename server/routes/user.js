const router = require('express').Router();
const {
  signup,
  login,
  logout   , 
  refreshToken,
  countUsers  ,
} = require("../controllers/userController"); // from controller

router.post("/auth/login", login);    // from  controller
router.post("/auth/register", signup);    // from  controller
router.post("/auth/refreshToken", refreshToken );    
router.post("/auth/logout", logout);    // 
router.get("/users_nbr", countUsers);    

module.exports = router;


