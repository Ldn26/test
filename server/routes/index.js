const router = require("express").Router();
const userRouter = require("./user");
const contactRouter = require("./contact");
router.use(userRouter);
router.use("/contacts", contactRouter);
module.exports = router;