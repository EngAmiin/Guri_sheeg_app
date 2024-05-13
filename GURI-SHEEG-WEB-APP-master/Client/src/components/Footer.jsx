import React from 'react'
import * as mui from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import {motion} from 'framer-motion';
export default function Footer() {
  return (
    <div className="footer-container">
      <mui.Grid container>
        <mui.Grid item lg={3} className="links-section">
          <h3 className="footer-titles">Quick Links</h3>

          <ul>
            <li>
              <Link>Bookings</Link>
            </li>
            <li>
              <Link>Favorites</Link>
            </li>
            <li>
              <Link>Notifies</Link>
            </li>
            <li>
              <Link>Houses</Link>
            </li>
          </ul>
        </mui.Grid>
        <mui.Grid item lg={3} className="links-section">
          <h3 className="footer-titles">Terms & References</h3>

          <ul>
            <li>
              <Link to={"/terms"}>Terms & Conditions</Link>
            </li>
            <li>
              <Link>Privacy Policy</Link>
            </li>
            <li>
              <Link>Data Collection</Link>
            </li>
          </ul>
        </mui.Grid>
        <mui.Grid item lg={3} className="links-section">
          <h3 className="footer-titles">Support</h3>

          <ul>
            <li>
              <Link>Help</Link>
            </li>
            <li>
              <Link>Report Issue</Link>
            </li>
          </ul>
        </mui.Grid>
        <mui.Grid item lg={3} className="links-section">
          <h3 className="footer-titles">Social Links</h3>

          <ul className="footer-social-links">
            <motion.li
              initial={{ y: 0 }}
              animate={{
                y: [40, 0, 40],
                transition: { duration: 4, delay: 2, repeat: Infinity },
              }}
            >
              <Link>
                <FacebookIcon />
              </Link>
            </motion.li>
            <motion.li
              initial={{ y: 0 }}
              animate={{
                y: [40, 0, 40],
                transition: { duration: 4, delay: 2, repeat: Infinity },
              }}
            >
              <Link>
                <WhatsAppIcon />
              </Link>
            </motion.li>
            <motion.li
              initial={{ y: 0 }}
              animate={{
                y: [40, 0, 40],
                transition: { duration: 4, delay: 2, repeat: Infinity },
              }}
            >
              <Link>
                <InstagramIcon />
              </Link>
            </motion.li>
          </ul>
        </mui.Grid>
      </mui.Grid>

      <mui.Box sx={{ textAlign: "center", mt: 5 }}>
        <mui.Typography className="copy-right">
          Allrights Reserved @GURI SHEEG - 2023
        </mui.Typography>
      </mui.Box>
      <mui.Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Link to={"https://github.com/ENG-CJ/"}>
          <img src="../../images/cj-01.png" className="footer-logo-developer" />
        </Link>
        <Link>
          <img src="../../images/logo-png.png" className="footer-logo-web" />
        </Link>
      </mui.Box>
    </div>
  );
}
