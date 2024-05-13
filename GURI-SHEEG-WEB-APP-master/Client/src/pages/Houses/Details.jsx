import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Grid,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Header from "../../dashboard/Header";
import SideBar from "../../dashboard/sidebar";
import { LocationCity, ArrowLeft } from "@mui/icons-material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PaidIcon from "@mui/icons-material/Paid";
import { HouseContext } from "../../context/HouseContext";
import { useParams } from "react-router-dom";
export default function Details() {
  var { id } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getHouseDetails } = useContext(HouseContext);

  const loadHouse = async () => {
    setLoading(true);
    var response = await getHouseDetails({
      ID: id,
    });
    console.log(response.data);
    setLoading(false);
    setDetails(response.data);
  };
  useEffect(() => {
    loadHouse();
  }, []);
  return (
    <Grid container>
      {loading && (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      )}

      <SideBar />
      <Grid item lg={10}>
        <Header />
        <Box sx={{ mx: 1, my: 3 }}>
          <Paper
            sx={{
              mb: 2,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Details House Code: 2982918291892819</Typography>
            <IconButton color="success" onClick={null}>
              <ArrowLeft fontSize="large" />
            </IconButton>
          </Paper>
          <Paper
            sx={{
              p: 4,
            }}
          >
            {details ? (
              <>
                
                {/* images data */}
                <Grid container columnSpacing={5} rowSpacing={4}>
               
                  {details.houseImage.map((image) => {
                    var currentImage = image.propertyID;
                    return (
                      <>
                        <Grid item lg={6}>
                          <img
                            src={`http://localhost:8900/upload/${image.propertyID}`}
                            className="house_image_resizer"
                          />
                        </Grid>
                      </>
                    );
                  })}
                </Grid>

                {/* House data */}
                <Grid sx={{ mt: 5 }} container columnSpacing={5} rowSpacing={4}>
                  {details.houseData.map((house) => {
                    return (
                      <>
                        <Grid item lg={6}>
                          <Typography>
                            House Code: <strong>{house.ID}</strong>
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              my: 2,
                            }}
                          >
                            <PinDropIcon sx={{ mr: 3 }} fontSize="large" />
                            <Box>
                              <Typography>{house.Address}</Typography>
                              <span style={{ fontSize: 15 }}>
                                {house.Street_address}
                              </span>
                            </Box>
                          </Box>
                          <Box>
                            <Typography>
                              La Kireestay:{" "}
                              <strong>
                                {house.Reserved == "true" ? "Haa" : "Maya"}
                              </strong>
                            </Typography>
                            <Typography>
                              Taarikhda La Diwangeliyey:{" "}
                              <strong>{house.DateCreated}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item lg={6}>
                          <Typography
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <LocationCity fontSize="large" sx={{ mr: 2 }} />{" "}
                            <strong>{house.HouseType}</strong>
                          </Typography>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              my: 2,
                            }}
                          >
                            <PaidIcon fontSize="large" sx={{ mr: 2 }} />{" "}
                            <strong style={{ fontSize: 30 }}>
                              ${house.MonthlyRent}
                            </strong>
                          </Typography>
                          <Typography sx={{ fontSize: 30 }}>
                            Lacagta Hormaris-ka :{" "}
                            <strong>${house.Hormarin}</strong>
                          </Typography>
                        </Grid>
                        <Grid item lg={12}>
                          <h2 style={{ color: "#9E9FA5", opacity: 0.9 }}>
                            Faahfaahin Dheerad Ah
                          </h2>
                          <Divider />
                          <Typography sx={{ my: 2 }}>
                            {house.Description}
                          </Typography>
                        </Grid>
                        <Grid item lg={12}>
                          <h2 style={{ color: "#9E9FA5", opacity: 0.9 }}>
                            Map Addres
                          </h2>
                          <Divider />
                          <Box sx={{ my: 2 }}>
                            {/* <div style={{width: "100%",background: "red"}} dangerouslySetInnerHTML={{__html: house.MapAddress}}></div> */}
                            <iframe
                              src={house.MapAddress}
                              width="100%"
                              height="550"
                              style={{ border: 10 }}
                              allowfullscreen=""
                              loading="lazy"
                              referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </Box>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </>
            ) : (
              "Loading"
            )}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
