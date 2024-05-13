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
  createUser,
  getAllUsers,
  deleteUser,
  findUserCredentials,
  fetchOneUser,
  searchUser,
  updateUser,
} = require("../controlers/users.controler");

const middWare = express.urlencoded({
  extended: true,
  limit: 10000000,
});

// Multer middle ware for uploading images (request)

var storage = multer.diskStorage({
  destination: "./public/profiles",
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.body.Username}-${cr.randomUUID()}${path.extname(
        file.originalname
      )}`
    );
  },
});

var upload = multer({
  storage: storage,
});
var storage_2 = multer.diskStorage({
  destination: "./public/profiles",
  filename: (req, file, cb) => {
    cb(
      null,
      `${req.body.Username}-${cr.randomUUID()}${path.extname(
        file.originalname
      )}`
    );
  },
});

var upload_2 = multer({
  storage: storage_2,
});



router.post("/create", upload.single("profile"), createUser);

router.get("/", getAllUsers);

router.delete("/delete/:id",  deleteUser);

router.get("/findUser/:email/:password",  findUserCredentials);

router.get("/fetchOne/:id",  fetchOneUser);

router.get("/search/:user", searchUser);

router.post(
  "/update",
  upload_2.single("profile_update"),
  deleteFromFile,
  updateUser
);

function deleteFromFile(req, res, next) {
  console.log("Homie Delete", req.body);
  if (req.body.type == "update") {
    console.log("update body");
    if (req.body.profile_update != "") {
      console.log("profile process body");
      if (file.existsSync(`./public/profiles/${req.body.Profile}`)) {
        file.unlink(`./public/profiles/${req.body.Profile}`, (err) => {
          if (err)
            return res.send({
              fileExist: true,
              isUnlinked: false,
              message: "Unlinking Error",
              serverError: err.message,
              errorName: err.name,
            });
          else next();
        });
      } else next();
    } else next();
  } else if (req.body.type == "delete") {
    return res.send({ deleted: true });
  } else {
    console.log("Homie Delete last", req.body);
    next();
  }
}

module.exports = router;
