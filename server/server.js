
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./sequelize/config");
const cookieParser = require("cookie-parser");
const  router  = require("./routes/index");
const  credentials   =  require("./cors/criedentials.js")
const corsOptions = require("./cors/corsoptions.js");
require("./sequelize"); // <-- this loads config, models, associations

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
  
app.use(router)
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: " route  not found",
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been  Established successfully.");
    return sequelize.sync({ force: false, alter: false });
  })
  .then(() => {
    console.log("Database synchronized");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Unable to connecto to the db")
    console.log(err)
    console.error("Unable to connect to the database:", err);
  });
