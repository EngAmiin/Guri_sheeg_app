// import "bootstrap/dist/css/bootstrap.css";
import {
  CardTravel,
  Dashboard,
  House,
  InsertEmoticonSharp,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import styles from "./style.module.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import TocIcon from "@mui/icons-material/Toc";
import PeopleIcon from "@mui/icons-material/People";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

import SpatialAudioIcon from "@mui/icons-material/SpatialAudio";
import "./sidebar.css";

  import axios from "axios";
const SideBar = () => {
  const [showAlumniProfileModal, setAlumniProfileModal] = useState(false);
  const [responseData, setResponseData] = useState();



  const handleView=()=>{
loadData();
setAlumniProfileModal(true)
  }

  const loadData = () => {
    axios
      .post("http://localhost/alumni-api/generalApi", {
        action: "ReadProfile",
        data: {
          table: "associationprofile",
        },
      })
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data.response);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Grid item lg={2} sx={{ background: "#322653", color: "white", minHeight: "100vh" }}>
      <Box sx={{ p: 2 }}>
        <div className={styles.user_zone}>
          <Avatar sizes="large" src="../../alumni-logo.jpeg" />
          <div>
            <span className="username-title">GURI SHEEG</span>
          </div>
        </div>
        <Divider sx={{ my: 2 }} />
        <div className={styles.list_content}>
          <Typography variant="h6" fontSize={19} sx={{ mb: 1 }}>
            Super Admin
          </Typography>
          <div className={styles.list}>
            <div className={styles.list_item}>
              <Dashboard fontSize="small" />
              <Link to={"/dashboard"} className={styles.link_title}>
                Dashboard
              </Link>
            </div>
          </div>

          <div className="list">
            <div className={styles.list_item}>
              <PeopleIcon fontSize="small" />
              <Link to={"/users"} className={styles.link_title}>
                System Users
              </Link>
            </div>
          </div>
          <div className="list">
            <div className={styles.list_item}>
              <House fontSize="small" />
              <Link to={"/houses"} className={styles.link_title}>
                House (Rooms)
              </Link>
            </div>
          </div>
          <div className="list">
            <div className={styles.list_item}>
              <House fontSize="small" />
              <Link to={"/lands"} className={styles.link_title}>
                Lands
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.list_content}>
          <Typography variant="h6" fontSize={19} sx={{ mb: 1 }}>
            Settings
          </Typography>
        </div>
      </Box>
      <Outlet/>
    </Grid>

  );
};

export default SideBar;
