const conn = require("../connections/db");
const multer = require("multer");
const path = require("path");
const cr = require("crypto");
const filePath = require("fs");
const { throws } = require("assert");

module.exports = {
  createLand: (req, res, next) => {
    const query = "CALL createLand(?,?,?,?,?,?,?,?,?,?,?,?)";
    const jihoyin = req.body.jihooyin.split(",");
    const values = [
      req.body.id,
      req.body.address,
      req.body.street_address,
      req.body.size,
      jihoyin[0],
      jihoyin[1],
      jihoyin[2],
      jihoyin[3],
      req.body.lacagta,
      req.body.sabarLoogo,
      req.body.description,
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

  createImages: (req, res, next) => {
    var connection = conn.initialize();

    var query = "INSERT INTO `landimages`(`image`, `land_id`) VALUES (?,?)";
    connection.query(query, [req.file.filename, req.body.id], (err, data) => {
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
              "Waa La diwaangeliyey Dhulkan Address-kiisu yahay " +
              req.body.street_address,
          });
      } catch (e) {
        return res.send({
          hasError: true,
          message: e.message,
        });
      }
    });
  },

  logErrors: (err, req, res, nex) => {
    return res.send({
      hasError: true,
      message: `Server Error Occurred, Info:  ${err.sqlMessage}`,
    });
  },

  getAllLands: (req, res) => {
    const query =
      "SELECT id,Dagmada,Size,Lacagta,Claimed,Reserved FROM `lands`";

    conn.initialize().query(query, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occurred while fetching the data",
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
    const query = "SELECT image from landimages where  land_id=?";
    var value = [req.body.id];

    conn.initialize().query(query, value, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occurred while removing this record",
          message: err.message,
          full_error: err.code,
        });
      else {
        if (data.length > 0) {
          if (filePath.existsSync(`./public/landImages/${data[0].image}`)) {
            filePath.unlink(`./public/landImages/${data[0].image}`, (err) => {
              if (err) {
                return res.send({
                  hasError: true,
                  error: "Linking Error",
                  message: "Linking Error",
                });
              } else {
                next();
              }
            });
          } else {
            next();
          }
        } else next();
      }

      // return res.send({
      //   hasError: false,
      //   message: "User has been removed successfully",
      // });
    });
  },

  deleteImageFromDB: (req, res, next) => {
    const query = "DELETE from landimages where land_id=?";
    var value = [req.body.id];

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
    });
  },
  deleteOwnerFromDB: (req, res, next) => {
    const query = "DELETE FROM `owners` WHERE property_id=?";
    var value = [req.body.id];

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
  deleteLandFromDB: (req, res, next) => {
    const query = "DELETE FROM `lands` WHERE id=?";
    var value = [req.body.id];

    conn.initialize().query(query, value, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured while removing",
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
  getLandDetails: (req, res, next) => {
    const query = "SELECT * FROM `lands` WHERE id=?";
    const query_images = "SELECT * FROM landimages WHERE land_id=?";
    const values = [req.params.id];
    conn.initialize().query(query, values, (err, landData) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      else {
        const _value = [req.params.id];
        conn.initialize().query(query_images, _value, (err, data) => {
          if (err)
            return res.send({
              hasError: true,
              error: "Error Occured",
              message: err.message,
              full_error: err.code,
            });
          else
            return res.send({
              hasError: false,
              landData: landData,
              images: data,
              id: req.params.id,
            });
        });
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

  fetchAllLands: (req, res, next) => {
    const query = "SELECT * FROM `lands` WHERE Reserved=? AND Claimed=?";

    conn
      .initialize()
      .query(query, ["" | "false", "false" | ""], (err, data) => {
        if (err)
          return res.send({
            hasError: true,
            error: "Error Occured",
            message: err.message,
            full_error: err.code,
          });
        else {
          req.body.landData = data;
          next();
        }
      });
  },

  fetchAllLandImages: (req, res, next) => {
    const query = "SELECT * FROM `landimages`";

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
          landData: req.body.landData,
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
