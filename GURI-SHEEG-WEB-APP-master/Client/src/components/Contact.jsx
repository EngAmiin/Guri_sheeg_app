import React from 'react'
import * as mui from '@mui/material'
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion' 
import ReplyIcon from "@mui/icons-material/Reply";
export default function Contact() {
  return (
    <mui.Container sx={{ marginTop: "140px", marginBottom: "30px" }}>
      <div className="contact-container">
        <mui.Box className="left-container">
          <img src="../../images/sent.svg" className="left-container-image" />
          <div className="logo">
            <img src="../../images/logo-png.png" />
          </div>
          <motion.div
            animate={{
              x: [-200, 0, 200, 0, -200],
              transition: { duration: 20, repeat: Infinity },
            }}
            className="social-links"
          >
            <Link>
              <FacebookIcon />
            </Link>
            <Link>
              <WhatsAppIcon />
            </Link>
            <Link>
              <InstagramIcon />
            </Link>
          </motion.div>
        </mui.Box>
        <mui.Box className="right-container">
          <div className="contact-header">
            <h2>Send a Message</h2>
            <p>Give us a feedback</p>
          </div>

          <div className="contact-form">
            <div className="form-control">
              <label>FullName</label>
              <input placeholder='Your FullName' type="text" />
            </div>
            <div className="form-control">
              <label>Email</label>
              <input placeholder='example@gmail.com' type="text" />
            </div>
            <div className="form-control">
              <label>Message</label>
              <textarea placeholder='Your Message Here!' rows={10}></textarea>
            </div>

            <mui.Button startIcon={<ReplyIcon/>} sx={{mt: 3}} variant="contained">Send</mui.Button>
          </div>
        </mui.Box>
      </div>
    </mui.Container>
  );
}
