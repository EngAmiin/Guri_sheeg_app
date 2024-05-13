import React from 'react'
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SellIcon from "@mui/icons-material/Sell";
import HelpIcon from "@mui/icons-material/Help";
import { Close, Favorite, PinDrop, Usb } from "@mui/icons-material";
import { Link } from 'react-router-dom';


export default function UserSideBar({menuList, styles}) {
    const icons = {
      AccountBoxIcon,
      BookmarksIcon,
      SellIcon,
      HelpIcon,
      Favorite,
    };
  return (
    <div className="profile-sidebar-menu-lists">
     {
        menuList.map((menu,index)=>{
            const Icon=icons[menu.icon];
            return (
              <div className="profile-sidebar-menu-list-item" key={index}>
                <Icon/>
                <Link style={{...styles}} to={menu.destination} >{menu.title}</Link>
              </div>
            );
        })
     }
     
   
   
    
      <div className="profile-sidebar-image-board">
        <img
          src={"../../images/logo-png.png"}
          style={{ width: "100%", marginLeft: "-50px" }}
        />
      </div>
    </div>
  );
}
