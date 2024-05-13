import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import SellIcon from "@mui/icons-material/Sell";
import BusinessIcon from '@mui/icons-material/Business';

import Marquee from "react-fast-marquee";

export default function Sponsored() {
  return (
    <Container>
      <div className="sponsored-content">
         <div className="sponsored-header">
             <h3>Trusted And Connected <BusinessIcon className="svg-sponsored"/></h3>
            <Typography>Sponsored By Verified Company, You Can Trus Us Now</Typography>
         </div>
          <div className="sponsored-slide-area">
          <Marquee gap={10}>
              <div className="inner-slide-area">
              <div className="slide">
                <img src='../../images/prem.png'/>
              </div>
              <div className="slide">
                <img src='../../images/stripe.png'/>
              </div>
              <div className="slide">
                <img src='../../images/airbnb.png'/>
              </div>
              <div className="slide">
                <img src='../../images/Mybanklimited.png'/>
              </div>
            </div>
          </Marquee>
          </div>
      </div>
    </Container>
  )
}
