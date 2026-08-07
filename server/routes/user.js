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


router.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];
  res.status(200).json(users); 
});

module.exports = router;


