import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import SellIcon from "@mui/icons-material/Sell";
import Land from "./Land";
import { LandContext } from "../context/LandContext";
import Marquee from "react-fast-marquee";
export default function LandSection() {
  const { fetchAllLands } = useContext(LandContext);
  const [data, setData] = useState();

  const loadLands = async () => {
    var { landData, imagesData } = await fetchAllLands();
    setData({
      lands: landData,
      images: imagesData,
    });
  };

  useEffect(() => {
    loadLands();
  }, []);
  return (
    <Container>
      <div className="hotels-section">
        <motion.img drag src="../../images/search.svg" className="svg-icon" />

        <div className="hotels-section-title">
          <h2>
            Dhulal iib Ah <SellIcon className="svg-right" />
          </h2>
          <Typography>Qabso Dhulka Aad Jecleeyd Inad iibsato</Typography>
        </div>

        <Grid container columnSpacing={20} rowSpacing={5} sx={{ mb: 2 }}>
          <Marquee pauseOnHover gradient gradientWidth={180}>
            {" "}
            {data && data.lands.length > 0
              ? data.lands.map((land) => {
                  var image = data.images.filter(
                    (img) => img.land_id == land.id
                  );

                  return (
                    <Grid item lg={4}>
                      <Land land={land} image={image[0]} />
                    </Grid>
                  );
                })
              : "No Data"}
          </Marquee>
        </Grid>
      </div>
    </Container>
  );
}
