const express = require("express");
const cors = require("cors");
const conn = require("../connections/db");
const multer = require("multer");
var bodyParser = require("body-parser");
const router = express.Router();
const cr = require("crypto");
const path = require("path");
const file = require("fs");
const { createLand, createImages, getAllLands, deleteImageFiles, deleteImageFromDB,deleteLandFromDB,
deleteOwnerFromDB, 
getLandDetails,
fetchAllLands,
fetchAllLandImages} = require("../controlers/LandController");

const { uploadSingleImage } = require("../util/util");
const { createOwner } = require("../controlers/house,controler");

router.post(
  "/create",
uploadSingleImage().single('image'),
  createLand,
  createImages,
  createOwner,

);
router.get(
  "/",
getAllLands

);
router.get(
  "/fetchLands",
fetchAllLands,
fetchAllLandImages
);
router.get(
  "/details/:id",
getLandDetails

);
router.post(
  "/deleteLand",
deleteImageFiles,
deleteImageFromDB,
deleteOwnerFromDB,
deleteLandFromDB


);



module.exports = router;
