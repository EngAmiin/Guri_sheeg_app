import {
  Image,
  ProductionQuantityLimitsSharp,
  SignalCellularConnectedNoInternet2BarTwoTone,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import styles from "./style.module.css";
import "./dashboard.css";


import TodayIcon from "@mui/icons-material/Today";
import TocIcon from "@mui/icons-material/Toc";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import Header from "./Header";
import SideBar from "./sidebar";
export default function Dashboard() {



  return (
    <>
    
      {/* <div className="container-fluid"> */}
      <Grid container>
      
        <SideBar />
        <Grid item  lg={10}>
          <Header />

          <Box sx={{ mx: 2, my:2 }}>
            <Grid container spacing={1}>
              <Grid item lg={4} md={12} sx={{ mb: 3 }}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: "#2A2F4F",
                    color: "white",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="content-details">
                      <PeopleIcon fontSize="large" color="error" />
                      <span></span>
                    </div>
                    <span className="section">Users</span>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={12} sx={{ mb: 3 }}>
                <Card sx={{ p: 4, borderRadius: 3, background: "#460C68" }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="content-details" style={{ color: "white" }}>
                      <TodayIcon fontSize="large" color="error" />
                      <span></span>
                    </div>
                    <span className="section">Events</span>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item lg={4} md={12} sx={{ mb: 3 }}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: "#8B1874",
                    color: "white",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="content-details">
                      <SchoolIcon fontSize="large" color="error" />
                      <span></span>
                    </div>
                    <span className="section dar-color">Alumni</span>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item lg={8} md={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography>Recent Alumni Graduates</Typography>
                  <Divider sx={{ my: 2 }} />
                 
                </Paper>
              </Grid>

              <Grid item lg={4} md={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6">Upcoming Events</Typography>
                  <Divider />
                
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
