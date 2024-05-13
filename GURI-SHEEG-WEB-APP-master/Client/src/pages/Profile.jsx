import React, { useEffect } from 'react'
import Header from '../components/Header'
import * as mui from '@mui/material'
import { Favorite, Usb } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SellIcon from "@mui/icons-material/Sell";
import HelpIcon from "@mui/icons-material/Help";
import ProfileData from './ProfileData';
export default function Profile() {
  const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("userData"))
       navigate("/")
  },[])
  return (
    <>
      <Header />
      <mui.Box>
        <mui.Grid container>
          <mui.Grid
            flex={1}
            item
            lg={3}
            sx={{ minHeight: "100vh" }}
            className="left-scroll"
          >
            <mui.Box
              sx={{
                p: 1,
              }}
            >
              <div className="profile-sidebar-menu-lists">
                <div className="profile-sidebar-menu-list-item">
                  <AccountBoxIcon fontSize="large" className="icon-color" />
                  <Link>Profile</Link>
                </div>
                <div className="profile-sidebar-menu-list-item">
                  <BookmarksIcon fontSize="large" className="icon-color" />
                  <Link>Bookings</Link>
                </div>
                <div className="profile-sidebar-menu-list-item">
                  <Favorite fontSize="large" className="icon-color" />
                  <Link>Favorites</Link>
                </div>
                <div className="profile-sidebar-menu-list-item">
                  <SellIcon fontSize="large" className="icon-color" />
                  <Link>Dhulalka iibka ah</Link>
                </div>
                <div className="profile-sidebar-menu-list-item">
                  <HelpIcon fontSize="large" className="icon-color" />
                  <Link>Help</Link>
                </div>
                <div className="profile-sidebar-image-board">
                  <img
                    src={"../../images/logo-png.png"}
                    style={{ width: "100%", marginLeft: "-50px" }}
                  />
                </div>
              </div>
            </mui.Box>
          </mui.Grid>
          <mui.Grid item lg={9}>
            <mui.Container>
              <mui.Box>
                <ProfileData/>
              </mui.Box>
            </mui.Container>
          </mui.Grid>
        </mui.Grid>
      </mui.Box>
    </>
  );
}
