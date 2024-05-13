import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import * as toasts from "react-hot-toast";
import React, { useContext, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { HouseContext } from "../context/HouseContext";
import { LocationCity, PinDrop } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import {ToastContainer,toast} from 'react-toastify'
export default function HousesSection() {
  const { fetchAllHouses } = useContext(HouseContext);
  const { setOpenLogin } = useContext(UserContext);

  const [hasFav, setHasFav] = useState(false);
  const [favorite, setFavorite] = useState();
  const [load, setLoad] = useState(false);
  const [houseHasFavorite, setHouseHasFavorite] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();


  const handleFav = () => {
    setLoad(true);

    setTimeout(() => {
      setHasFav(!hasFav);
      setLoad(false);
    }, 3000);
  };

  const loadHouses = async () => {
    var response = await fetchAllHouses();
    console.log(response);
    setData(response.data);
  };

  const isRegistered = (favorite, houses) => {
    if (favorite.length <= 0) return false;
    var newAr = favorite.filter((f) => f.ID == houses.ID);
    return newAr.length > 0;
  };

  const createFavoriteLocalStorage = (hasFavoriteAction, favs, house) => {
    if (!hasFavoriteAction) {
      favs.push(house);
      setFavorite(favs);
      localStorage.setItem("fav", JSON.stringify(favs));

        toasts.toast.success(`Added to the Favorites 💖`, {
          position: "top-center",
        });
    } else {
      var filterFav = favs.filter((f) => f.ID != house.ID);

      localStorage.setItem("fav", JSON.stringify(filterFav));
      favs = JSON.parse(localStorage.getItem("fav") || "[]");
      setFavorite(favs);

      toasts.toast.success(`Removed From Favorites 💕`, {
      position: 'top-center'
      });
    }
  };

  useEffect(() => {
    loadHouses();
    const favs = JSON.parse(localStorage.getItem("fav") || "[]");
    setFavorite(favs);
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <toasts.Toaster/>
      <div className="houses-section-content">
        <div className="house-section-title">
          <h2>Latest Houses And Rooms</h2>
          <Typography>Find Over 500+ Houses </Typography>
        </div>

        <Grid container columnSpacing={20} rowSpacing={5} sx={{ mb: 2 }}>
          {data &&
            data.houseData.map((house) => {
              var imageArray = data.imagesData.filter(
                (imageData) => imageData.image == house.ID
              );

              return (
                <Grid item lg={4} key={house.ID}>
                  <Box>
                    <Paper elevation={0} className="paper">
                      <div className="house-image">
                        <IconButton
                          className="icon-fav"
                          onClick={() => {
                            if (!localStorage.getItem("userData")) {
                              setOpenLogin(true);
                              return;
                            }

                            var favs = JSON.parse(
                              localStorage.getItem("fav") || "[]"
                            );
                            var hasFavoriteAction = isRegistered(favs, house);
                            createFavoriteLocalStorage(
                              hasFavoriteAction,
                              favs,
                              house
                            );
                          }}
                        >
                          {favorite ? (
                            favorite.length > 0 ? (
                              favorite.filter((fav) => {
                                return fav.ID == house.ID;
                              }).length > 0 ? (
                                <FavoriteIcon />
                              ) : (
                                <FavoriteBorderIcon />
                              )
                            ) : (
                              <FavoriteBorderIcon />
                            )
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>

                        <Splide>
                          {imageArray.map((image) => {
                            return (
                              <SplideSlide key={image.id}>
                                <img
                                  src={`http://localhost:8900/upload/${image.propertyID}`}
                                />
                              </SplideSlide>
                            );
                          })}
                        </Splide>
                      </div>
                      <div className="house-details">
                        <h4>{house.Address}</h4>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {house.Street_address}

                          <IconButton>
                            <PinDrop fontSize="large" />
                          </IconButton>
                        </Typography>

                        <div className="house-type">
                          <Typography>
                            Nooca Guriga: <strong>{house.HouseType}</strong>
                          </Typography>
                        </div>
                        <div className="Price-details">
                          <Typography>
                            /Month: <strong>${house.MonthlyRent}</strong>
                          </Typography>
                          <Typography>
                            Hormarin: <strong>${house.Hormarin}</strong>
                          </Typography>
                        </div>
                        <Button
                          onClick={() => {
                            navigate(`/${house.ID}`);
                          }}
                          variant="contained"
                          sx={{ background: "#BE5A83", mt: 2 }}
                        >
                          Details
                        </Button>
                      </div>
                    </Paper>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </Container>
  );
}
