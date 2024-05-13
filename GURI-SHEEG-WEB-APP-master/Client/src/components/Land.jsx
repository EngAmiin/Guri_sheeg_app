import React from 'react'
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Marquee from 'react-fast-marquee';

export default function Land({ land, image }) {
  return (  
    <Box >
    
    
        <Paper elevation={0} className="paper" sx={{mr: 2}}>
          <div className="hotel-image">
            <img src={`http://localhost:8900/landImages/${image.image}`} />
          </div>
          <div className="hotel-details">
            <h4>{land.Dagmada}</h4>
            <Typography>{land.Street_address}</Typography>

            <div className="hotel-type">
              <Typography>
                Size: <strong>{land.Size}</strong>
              </Typography>
            </div>
            <div className="Price-details">
              <Typography>
                USD: <strong>${land.Lacagta}</strong>
              </Typography>
              <Typography color={"purple"}>
                <strong>Claimed When Approval Occurres</strong>
              </Typography>
            </div>
            {/* <Button
                    variant="contained"
                    sx={{ background: "#BE5A83", mt: 2 }}
                  >
                    More Details
                  </Button> */}
          </div>
        </Paper>
      
    </Box>
  );
}
