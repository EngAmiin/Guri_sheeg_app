import { Button } from "@mui/material";
import React from "react";
import PlaceIcon from '@mui/icons-material/Place';
import Login from "../Modals/Login";

export default function HeroSection() {
  return (
    <div className="hero-container">
      <div className="main-content">
        <h2>FIND YOUR PREFERRED <strong className="strong">HOUSE OR ROOM</strong> <br/>FROM OUTSIDE OR INSIDE MOGADISHU</h2>
         <div className="sub-text">
          <p>Find the perfect place to stay at an amazing price in Mogadishu. Belong anywhere In Mogadishu with Guri Sheeg. <br/>We will gain the trust and confidence of our stakeholders by maintaining a high degree oftransparency</p>
        </div>

          <div className="buttons">
        <Button className="search" startIcon={ <PlaceIcon/>}>Search Perfect Place</Button>
        <Button className="join">Join</Button>
      </div>
      </div>

    
     
    </div>
  );
}
