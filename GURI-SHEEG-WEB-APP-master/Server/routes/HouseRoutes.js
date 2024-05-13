const express = require("express");
const cors = require("cors");
const conn = require("../connections/db");
const multer = require("multer");
var bodyParser = require("body-parser");
const router = express.Router();
const cr = require("crypto");
const path = require("path");
const file = require("fs");
const {
  setPropertyImages,
  createHouse,
  createOwner,
  createImages,
  logErrors,
  getAllHouses,
  deleteImageFiles,
  deleteImageFromDB,
  deleteOwnerFromDB,
  deleteHouseFromDB,
  getHouseDetails,
  getHouseImages,
  fetchAllHouses,
  fetchAllPropertyImages,
  makeReservationHouse,
  updateHouseAsReserve,
  fetchBookingByUser,
  releaseHouse,
  updateHouseFromReleases,
  deleteReservation,
} = require("../controlers/house,controler");



router.post(
  "/create",
  setPropertyImages().array("propertyImages"),
  createHouse,
  createOwner,
  createImages,
  logErrors
);
router.get("/", getAllHouses);
router.post(
  "/deleteHouse/",
  deleteImageFiles,
  deleteImageFromDB,
  deleteOwnerFromDB,
  deleteHouseFromDB
);

router.post("/houseDetails", getHouseDetails, getHouseImages);
router.get("/getAllHouses", fetchAllHouses, fetchAllPropertyImages);
router.get("/booking/:client_id", fetchBookingByUser, fetchAllPropertyImages);
router.post("/reserve", makeReservationHouse, updateHouseAsReserve);
router.post("/release", releaseHouse, deleteReservation, updateHouseFromReleases);




module.exports = router;
