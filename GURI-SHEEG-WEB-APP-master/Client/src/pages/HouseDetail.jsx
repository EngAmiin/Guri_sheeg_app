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
  FormControl,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import { LocationCity, ArrowLeft } from "@mui/icons-material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PaidIcon from "@mui/icons-material/Paid";
import { HouseContext } from "../context/HouseContext";
import { json, useParams } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { UserContext } from "../context/UsersContext";
export default function HouseDetail() {
  var { id } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { setOpenLogin } = React.useContext(UserContext);
  const {makeReservationHouse} = React.useContext(HouseContext);

  const handleDisable = () => setDisabled(!disabled);
  const handleReservation = async() => {
    if (localStorage.getItem("userData")) {
        var todayDate = new Date().toISOString().slice(0, 10);
        var storage = JSON.parse(localStorage.getItem("userData"));

        var data={
            house: id,
            client: storage.ID,
            date: todayDate,
            type: "house reservation",

        }

        var response = await makeReservationHouse(data);
        alert(response.data.message);

    } else {
      setOpenLogin(true);
    }
  };

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
    <>
      <Header />
      <Container>
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
        <Grid container>
          {loading && (
            <Backdrop open={true}>
              <CircularProgress />
            </Backdrop>
          )}

          <Grid item lg={12}>
            <Box sx={{ mx: 1, my: 3 }}>
              <Paper
                sx={{
                  p: 4,
                }}
              >
                {details ? (
                  <>
                    {/* images data */}
                    <Grid container columnSpacing={5} rowSpacing={0}>
                      {details.houseImage.map((image) => {
                        var currentImage = image.propertyID;
                        return (
                          <>
                            <Grid item lg={4}>
                              <img
                                src={`http://localhost:8900/upload/${image.propertyID}`}
                                style={{
                                  width: "100%",
                                  height: "300px",
                                  borderRadius: "7px",
                                }}
                              />
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>

                    {/* House data */}
                    <Grid
                      sx={{ mt: 5 }}
                      container
                      columnSpacing={14}
                      rowSpacing={4}
                    >
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
                    <Paper
                      elevation={0}
                      sx={{
                        mb: 2,
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Grid container columnSpacing={3}>
                        <Grid item lg={6}>
                          <Box>
                            <Paper
                              elevation={0}
                              sx={{ background: "white", p: 2 }}
                            >
                              <Box sx={{}}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                  }}
                                >
                                  <Typography>Sponsor Details</Typography>
                                  <Divider />
                                  <Box>
                                    <Typography>
                                      Sponser-name:{" "}
                                      <strong>Mohamed Ali Farah</strong>
                                    </Typography>
                                    <Typography
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: 4,
                                        mt: 1,
                                      }}
                                    >
                                      <CallIcon sx={{ mr: 1 }} />
                                      +25261578163
                                    </Typography>
                                    <Typography
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: 4,
                                        my: 2,
                                      }}
                                    >
                                      <PinDropIcon sx={{ mr: 1 }} />
                                      Hodan, Banadir
                                    </Typography>
                                    <Typography
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: 4,
                                        my: 2,
                                      }}
                                    >
                                      <LocationCity sx={{ mr: 1 }} />
                                      Mogadishu, Somalia
                                    </Typography>
                                  </Box>

                                  <Typography>Contact Guri-Sheeg</Typography>
                                  <Divider />
                                  <Box>
                                    <Typography>
                                      Nagala Soo Xariir Faalloyin-kaan
                                    </Typography>
                                    <Typography
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: 4,
                                        mt: 1,
                                      }}
                                    >
                                      <CallIcon sx={{ mr: 1 }} />
                                      +25261578163
                                    </Typography>
                                    <Typography
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: 4,
                                        my: 2,
                                      }}
                                    >
                                      <FacebookIcon sx={{ mr: 1 }} />
                                      Hodan, Banadir
                                    </Typography>
                                    <Typography
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        ml: 4,
                                        my: 2,
                                      }}
                                    >
                                      <WhatsAppIcon sx={{ mr: 1 }} />
                                      Mogadishu, Somalia
                                    </Typography>
                                  </Box>

                                  <Typography>Notice ✔</Typography>
                                  <Divider />
                                  <Box>
                                    <Typography>
                                      Dalbadashadu Waxay Dhici Doontaa 2 Bari
                                      kadib markii Aad Guriga Dalbatid, Fadlan
                                      Nagala Soo Xirir Cinwaanada Kor Ku Xusan
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Paper>
                          </Box>
                        </Grid>
                        <Grid item lg={6}>
                          <Box>
                            <Paper sx={{ background: "white", p: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <h3 style={{ fontFamily: "poppins" }}>
                                  Make Reservation For This House
                                </h3>

                                <Button
                                  color="success"
                                  variant="contained"
                                  onClick={handleReservation}
                                >
                                  Reserve
                                </Button>
                              </Box>
                              <Divider />
                              <Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    my: 2,
                                  }}
                                >
                                  <Typography>
                                    We use Current user as reservation
                                    information, please make sure your profile
                                    Data is valid info, so we can contact you
                                    immediately after reservation, if you have
                                    valid info please update from your profile
                                    info
                                  </Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </>
                ) : (
                  "Loading"
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
