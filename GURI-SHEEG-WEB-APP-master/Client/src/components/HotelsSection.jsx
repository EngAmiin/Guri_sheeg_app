import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import SellIcon from "@mui/icons-material/Sell";
export default function HotelsSection() {
  return (
    <Container>
      <div className="hotels-section">
        <motion.img drag src="../../images/search.svg" className="svg-icon" />

        <div className="hotels-section-title">
          <h2>
            VIP Hotel Rooms <SellIcon className="svg-right" />
          </h2>
          <Typography>Book VIP Rooms Over 20+ Hotels</Typography>
        </div>

        <Grid container columnSpacing={20} rowSpacing={5} sx={{ mb: 2 }}>
          <Grid item lg={4}>
            <Box>
              <Paper elevation={0} className="paper">
                <div className="hotel-image">
                  <FavoriteBorderIcon className="icon-fav" />

                  <img src="../../images/hotel-3.jpg" />
                </div>
                <div className="hotel-details">
                  <h4>Elite Hotel</h4>
                  <Typography>Streets Digfeer, Rd</Typography>

                  <div className="hotel-type">
                    <Typography>
                      Active Rooms: <strong>10</strong>
                    </Typography>
                  </div>
                  <div className="Price-details">
                    <Typography>
                      USD: <strong>10 x 500</strong>
                    </Typography>
                    <Typography>
                      Total USD: <strong>$12000/night</strong>
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ background: "#BE5A83", mt: 2 }}
                  >
                    More Details
                  </Button>
                </div>
              </Paper>
            </Box>
          </Grid>

              <Grid item lg={4}>
            <Box>
              <Paper elevation={0} className="paper">
                <div className="hotel-image">
                  <FavoriteBorderIcon className="icon-fav" />

                  <img src="../../images/hotel-1.jpg" />
                </div>
                <div className="hotel-details">
                  <h4>Karmel Hotel</h4>
                  <Typography>Streets Digfeer, Rd</Typography>

                  <div className="hotel-type">
                    <Typography>
                      Active Rooms: <strong>10</strong>
                    </Typography>
                  </div>
                  <div className="Price-details">
                    <Typography>
                      USD: <strong>10 x 500</strong>
                    </Typography>
                    <Typography>
                      Total USD: <strong>$12000/night</strong>
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ background: "#BE5A83", mt: 2 }}
                  >
                    More Details
                  </Button>
                </div>
              </Paper>
            </Box>
          </Grid>

              <Grid item lg={4}>
            <Box>
              <Paper elevation={0} className="paper">
                <div className="hotel-image">
                  <FavoriteBorderIcon className="icon-fav" />

                  <img src="../../images/hotel-2.jpg" />
                </div>
                <div className="hotel-details">
                  <h4>Baranada Hotel</h4>
                  <Typography>Streets Digfeer, Rd</Typography>

                  <div className="hotel-type">
                    <Typography>
                      Active Rooms: <strong>10</strong>
                    </Typography>
                  </div>
                  <div className="Price-details">
                    <Typography>
                      USD: <strong>10 x 500</strong>
                    </Typography>
                    <Typography>
                      Total USD: <strong>$12000/night</strong>
                    </Typography>
                  </div>
                  <Button
                    variant="contained"
                    sx={{ background: "#BE5A83", mt: 2 }}
                  >
                    More Details
                  </Button>
                </div>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
