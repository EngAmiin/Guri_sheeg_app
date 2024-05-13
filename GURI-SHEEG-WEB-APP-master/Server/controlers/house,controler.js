const conn = require("../connections/db");
const multer = require("multer");
const path = require("path");
const cr = require("crypto");
const filePath = require("fs");
const { throws } = require("assert");

module.exports = {
  createHouse: (req, res, next) => {
    const query = "CALL createRentalHouse(?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
      req.body.id,
      req.body.address,
      req.body.street_address,
      req.body.house_type,
      req.body.rent_money,
      req.body.hormarin,
      req.body.map_address,
      req.body.description,
      "false",
      "false",
      req.body.date,
    ];
    var connection = conn.initialize();
    connection.query(query, values, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else next();
    });
  },
  createOwner: (req, res, next) => {
    const query = "CALL createOwner(?,?,?,?,?,?,?,?)";
    const values = [
      req.body.fullName,
      req.body.gender,
      req.body.mobile,
      req.body.owner_address,
      req.body.owner_region,
      req.body.owner_description,
      req.body.id,
      req.body.property_type,
    ];

    var connection = conn.initialize();
    connection.query(query, values, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else next();
      // return res.send({
      //   hasError: false,
      //   message: `Waa La Diiwangeliyay Guriga Address-kiisu Yahay ${req.body.street_address}`,
      // });
    });
  },
  createImages: (req, res, next) => {
    const files = req.files;
    var connection = conn.initialize();

    if (files.length > 0) {
      var query = `CALL setPropertyImages(?)`;
      for (var i = 0; i < files.length; i++) {
        var image = files[i].filename;
        var propertyID = req.body.id;
        connection.query(query, [[image, propertyID]], (err, data) => {
          try {
            if (err) {
              throw {
                hasError: true,
                message: "Error Occurred While Setting Images Uploading",
              };
            } else
              return res.send({
                hasError: false,
                message:
                  "Waa La diwaangeliyey Guriga Address-kiisu yahay " +
                  req.body.street_address,
              });
          } catch (e) {
            return res.send({
              hasError: true,
              message: e.message,
            });
          }
        });
      }
    } else
      return res.send({
        hasError: true,
        message:
          "it seems no image available, please upload at least one image for this house",
      });
  },
  logErrors: (err, req, res, nex) => {
    return res.send({
      hasError: true,
      message: `Server Error Occurred, Info:  ${err.sqlMessage}`,
    });
  },
  getAllHouses: (req, res) => {
    const query = "SELECT ID,Address,HouseType,MonthlyRent FROM `houses`";

    conn.initialize().query(query, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });

      return res.send({
        hasError: false,
        message: "",
        data: data,
      });
    });
  },

  deleteImageFiles: (req, res, next) => {
    const query = "SELECT *from property_images where  image=?";
    var value = [req.body.ID];

    conn.initialize().query(query, value, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        if (data.length > 0) {
          data.map((image) => {
            if (filePath.existsSync(`./public/upload/${image.propertyID}`)) {
              filePath.unlink(`./public/upload/${image.propertyID}`, (err) => {
                if (err) {
                  return res.send({
                    hasError: true,
                    message: "Linking Error",
                  });
                } else {
                  next();
                }
              });
            } else {
              next();
            }
          });
        } else next();
      }

      // return res.send({
      //   hasError: false,
      //   message: "User has been removed successfully",
      // });
    });
  },

  deleteImageFromDB: (req, res, next) => {
    console.log("Image Fiom DB");
    const query = "DELETE from property_images where  image=?";
    var value = [req.body.ID];

    conn.initialize().query(query, value, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        next();
      }

      // return res.send({
      //   hasError: false,
      //   message: "User has been removed successfully",
      // });
    });
  },
  deleteOwnerFromDB: (req, res, next) => {
    const query = "DELETE FROM `owners` WHERE property_id=?";
    var value = [req.body.ID];

    conn.initialize().query(query, value, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        next();
      }

      // return res.send({
      //   hasError: false,
      //   message: "User has been removed successfully",
      // });
    });
  },
  deleteHouseFromDB: (req, res, next) => {
    const query = "DELETE FROM `houses` WHERE ID=?";
    var value = [req.body.ID];

    conn.initialize().query(query, value, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        return res.send({
          hasError: false,
          message: "Successfully Removed",
        });
      }

      // return res.send({
      //   hasError: false,
      //   message: "User has been removed successfully",
      // });
    });
  },
  getHouseDetails: (req, res, next) => {
    const query = "SELECT *FROM houses WHERE ID=?";
    const values = [req.body.ID];
    conn.initialize().query(query, values, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        req.body.houseData = data;
        next();
        return;
      }
    });
  },
  getHouseImages: (req, res, next) => {
    const query = "SELECT *FROM property_images WHERE image=?";
    const values = [req.body.ID];
    conn.initialize().query(query, values, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        return res.send({
          hasError: false,
          error: "Error Occured",
          houseData: req.body.houseData,
          houseImage: data,
        });
      }
    });
  },

  setPropertyImages: () => {
    var storageEng = multer.diskStorage({
      destination: "./public/upload",
      filename: (req, file, cb) => {
        var houseID = `${cr.randomUUID()}_${req.body.id}`;
        cb(null, `${houseID}${path.extname(file.originalname)}`);
      },
    });

    var upload = multer({
      storage: storageEng,
      limits: {
        fieldNameSize: Infinity,
        fieldSize: Infinity,
      },
    });

    return upload;
  },

  fetchAllHouses: (req, res, next) => {
    const query = "SELECT * FROM `houses` WHERE Reserved=?";

    conn.initialize().query(query, ["false"], (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        req.body.housesData = data;
        next();
        return;
      }
    });
  },

  fetchAllPropertyImages: (req, res, next) => {
    const query = "SELECT * FROM `property_images`";

    conn.initialize().query(query, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        return res.send({
          status: true,
          hasError: false,
          houseData: req.body.housesData,
          imagesData: data,
        });
      }
    });
  },

  makeReservationHouse: (req, res, next) => {
    const query = "CALL makeReservation(?,?,?,?)";
    var values = [
      req.body.type,
      req.body.house,
      req.body.client,
      req.body.date,
    ];

    conn.initialize().query(query, values, (err, data) => {
      try {
        if (err)
          throw {
            message: "Error Occurred While Reservation Please Try Again",
            queryError: err.sqlMessage,
            hasError: true,
          };
        else {
          next();
        }
      } catch (e) {
        return res.send(e);
      }
    });
  },

  updateHouseAsReserve: (req, res, next) => {
    const query = "UPDATE houses set Reserved=? where ID=?";
    var values = ["true", req.body.house];

    conn.initialize().query(query, values, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        return res.send({
          status: true,
          hasError: false,
          message: `You Reserved The House That Has House ${req.body.house}, This Reservation Expired Within 10days`,
        });
      }
    });
  },

  deleteReservation: (req, res, next) => {
    const query = "DELETE From reservations where id=?";

    conn.initialize().query(query, [req.body.reservationId], (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        next();
      }
    });
  },
  fetchBookingByUser: (req, res, next) => {
    const query = "CALL fetchBookingByUser(?)";

    conn.initialize().query(query, [req.params.client_id], (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        req.body.housesData = data;
        next();
      }
    });
  },

  releaseHouse: (req, res, next) => {
    const query =
      "INSERT INTO `releasesbookings`(`reservationID`, `reason`,`house_id`,`client_id`, `date`) VALUES (?,?,?,?,?)";
    var values = [
      req.body.reservationId,
      req.body.reason,
      req.body.houseId,
      req.body.client_id,
      req.body.release_date,
    ];

    conn.initialize().query(query, values, (err, data) => {
      try {
        if (err)
          throw {
            message: "Error Occurred While Reservation Please Try Again",
            queryError: err.message,
            hasError: true,
          };
        else {
          next();
        }
      } catch (e) {
        return res.send(e);
      }
    });
  },
  updateHouseFromReleases: (req, res, next) => {
    const query = "UPDATE houses SET Reserved=? WHERE ID=?";
    var values = ["false", req.body.houseId];

    conn.initialize().query(query, values, (err, data) => {
      try {
        if (err)
          throw {
            message: "Error Occurred While Reservation Please Try Again",
            queryError: err.message,
            hasError: true,
          };
        else {
          return res.send({
            hasError: false,
            message: `Waxaad ka Laabatay Guriga Code-kiisu Yahay ${req.body.houseId}, Soo Laabasho Wacan😊`,
          });
        }
      } catch (e) {
        return res.send(e);
      }
    });
  },
};
