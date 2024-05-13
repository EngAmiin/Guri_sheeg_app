import React, { useContext, useEffect, useState } from "react";
import { Grid, Skeleton } from "@mui/material";
import Header from "../../dashboard/Header";
import SideBar from "../../dashboard/sidebar";
import DetailContent from "./components/DetailContent";
import { LandContext } from "../../context/LandContext";
import { useParams } from "react-router-dom";

export default function LandDetail() {
  const { id } = useParams();
  const { getLandDetails } = useContext(LandContext);
  const [data, setData] = useState();

  const load = async () => {
  const { landData, images } = await getLandDetails(id);
  setData({
    images: images,
    land: landData,
  });
    console.log("land : ", landData, "images : ", images);
  };

  useEffect(() => {
   setTimeout(() => {
     load();
   }, 5000);
  }, []);
  return (
    <>
      <Grid container>
        <SideBar />
        <Grid item lg={10}>
          <Header />
          <DetailContent land={data} images={data} />
        </Grid>
      </Grid>
    </>
  );
}
