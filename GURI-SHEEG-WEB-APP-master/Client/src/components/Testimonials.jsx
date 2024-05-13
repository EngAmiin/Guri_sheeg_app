import React from "react";
import * as mui from '@mui/material';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
export default function Testimonials() {
  return (
    <mui.Container sx={{ mt: 5 }}>
      <div className="testimonials-container">
        <div className="test-title">
          <h2>Testimonials</h2>
          <p>What Others Said</p>
        </div>

        <div className="testimonials-content">
          <Splide options={{ perPage: 2, fixedWidth: "500px",arrows: false }}>
            <SplideSlide className="slide-splide">
              <div className="testimonial">
                <div className="feedback-text">
                  <p>
                    "MASHA ALLAH WAA WEBSITE AAD U FAA'IDO BADAN WAXAAN WAX KA
                    DALBADAY ANIGOO JOOGO WADAKA BANANKISA"
                  </p>
                </div>

                <div className="user-content">
                  <div className="user-image">
                    <img src='../../images/profile.svg'/>
                  </div>
                  <div className="username">
                    <mui.Typography className="name">Abdulrahman</mui.Typography>
                    <mui.Typography className="position">Software Developer</mui.Typography>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="slide-splide">
              <div className="testimonial">
                <div className="feedback-text">
                  <p>
                    "MASHA ALLAH WAA WEBSITE AAD U FAA'IDO BADAN WAXAAN WAX KA
                    DALBADAY ANIGOO JOOGO WADAKA BANANKISA"
                  </p>
                </div>

                <div className="user-content">
                  <div className="user-image">
                    <img src='../../images/profile.svg'/>
                  </div>
                  <div className="username">
                    <mui.Typography className="name">Abdulrahman</mui.Typography>
                    <mui.Typography className="position">Software Developer</mui.Typography>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="slide-splide">
              <div className="testimonial">
                <div className="feedback-text">
                  <p>
                    "MASHA ALLAH WAA WEBSITE AAD U FAA'IDO BADAN WAXAAN WAX KA
                    DALBADAY ANIGOO JOOGO WADAKA BANANKISA"
                  </p>
                </div>

                <div className="user-content">
                  <div className="user-image">
                    <img src='../../images/profile.svg'/>
                  </div>
                  <div className="username">
                    <mui.Typography className="name">Abdulrahman</mui.Typography>
                    <mui.Typography className="position">Software Developer</mui.Typography>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="slide-splide">
              <div className="testimonial">
                <div className="feedback-text">
                  <p>
                    "MASHA ALLAH WAA WEBSITE AAD U FAA'IDO BADAN WAXAAN WAX KA
                    DALBADAY ANIGOO JOOGO WADAKA BANANKISA"
                  </p>
                </div>

                <div className="user-content">
                  <div className="user-image">
                    <img src='../../images/profile.svg'/>
                  </div>
                  <div className="username">
                    <mui.Typography className="name">Abdulrahman</mui.Typography>
                    <mui.Typography className="position">Software Developer</mui.Typography>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="slide-splide">
              <div className="testimonial">
                <div className="feedback-text">
                  <p>
                    "MASHA ALLAH WAA WEBSITE AAD U FAA'IDO BADAN WAXAAN WAX KA
                    DALBADAY ANIGOO JOOGO WADAKA BANANKISA"
                  </p>
                </div>

                <div className="user-content">
                  <div className="user-image">
                    <img src='../../images/profile.svg'/>
                  </div>
                  <div className="username">
                    <mui.Typography className="name">Abdulrahman</mui.Typography>
                    <mui.Typography className="position">Software Developer</mui.Typography>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide className="slide-splide">
              <div className="testimonial">
                <div className="feedback-text">
                  <p>
                    "MASHA ALLAH WAA WEBSITE AAD U FAA'IDO BADAN WAXAAN WAX KA
                    DALBADAY ANIGOO JOOGO WADAKA BANANKISA"
                  </p>
                </div>

                <div className="user-content">
                  <div className="user-image">
                    <img src='../../images/profile.svg'/>
                  </div>
                  <div className="username">
                    <mui.Typography className="name">Abdulrahman</mui.Typography>
                    <mui.Typography className="position">Software Developer</mui.Typography>
                  </div>
                </div>
              </div>
            </SplideSlide>
            
          </Splide>
        </div>
      </div>
    </mui.Container>
  );
}
