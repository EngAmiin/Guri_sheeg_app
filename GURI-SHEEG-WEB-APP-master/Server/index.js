const express=require("express");
const app = express();
const cors = require('cors');
var bodyParser = require("body-parser");
var formidable=require('express-formidable');



// app.use(express())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

const userRoutes = require("./routes/UserRoutes");
const houseRoutes=require('./routes/HouseRoutes');
const landRoutes=require('./routes/LandRoutes');

app.use("/users",userRoutes);
app.use("/house",houseRoutes);
app.use("/land",landRoutes);




// port
app.listen(8900, () => {
  console.log("Running");
});