import * as React from 'react'
import * as mui from '@mui/material'
import Footer from '../components/Footer';
import Header from '../components/Header';
export default function Terms() {

  const [open,setOpen]=React.useState(false);

  const handleClose=()=>setOpen(false);
  return (
    <>
    <Header/>
      <mui.Container sx={{ mt: 5 }}>
        <img src="../../images/check.svg" className="check-list" />
        <div className="terms-content">
          <div className="left-terms">
            <div className="terms-title">
              <h2>Terms & Conditions</h2>
              <mui.Typography>Please Read Carefully</mui.Typography>
            </div>

            <div className="terms">
              <div className="term-header">
                <h3>Laga Kireeyaha Guriga</h3>
              </div>
              <div className="terms-text">
                <p>
                  Markii Aad guriga soo dalbato waxaan kaa qaai donna lacag
                  carbuun ah taas udhiganta haaf lacagta guriga lagu kirenayo
                  ama hotel-ka. markii guriga aad dalbato waa inaad imaada
                  (xafiiska) si laguu approve gareeyo ama laguu aqbalo.
                  Hishiiska iyo macluumadka oo dhan waxay ku xusan yihiin xogta
                  guriga aad dalabanaysid fadlan iska hubi intaadan approve
                  gareeyn ama aad{" "}
                  <kbd>
                    <strong>
                      <em>reserve laguu dhihin</em>
                    </strong>
                  </kbd>{" "}
                  Mar Haddii aad dalbato, lacagta in laguu soo celiyo process
                  dheer ayay qaadanysaa
                </p>

                <h4>Payment Process</h4>
                <ul>
                  <li>
                    Lacagta Hormarin ayaa diri doontaa markii aad dalbato
                    guriga.
                  </li>
                  <li>
                    Hadday Wax Cillad Ah dhacaaan ama wax idaba maraan oo aad
                    rabt inaad ka laabato (payment-ga) waxay qaadan doontaa
                    inaan dib kugu soo celino lacagtaada <strong>24hr</strong>{" "}
                    Gudaheed.
                  </li>
                </ul>
              </div>
            </div>

            <div className="terms">
              <div className="term-header">
                <h3>Hotels Terms</h3>
              </div>
              <div className="terms-text">
                <p>
                  Hotel-ka markii aad booking gareenaysid, lacagta booking-ka
                  waxaa la socotoda lacag khidmo ah, taas oo system-ka kaa jari
                  doono markii aad card-ka aad isticmaashid, lacagtaas waxay
                  dhantahay ($10) transaction walba oo dhaca. Sidoo kale
                  xogtaada booking-ka waxaa la wadaagi doonna hotel-ka aad
                  qabsaty, macluumadkaga waa xadidanyihin markii laga reebo{" "}
                  <strong>Hotel bookings</strong>
                </p>

                <h4>Payment Process</h4>
                <ul>
                  <li>
                    Lacagta Hormarin iyo mid khidmo ah ayaa diri doontaa markii
                    aad hotel booking sameeysid.
                  </li>
                  <li>
                    Hadday Wax Cillad Ah dhacaaan ama wax idaba maraan oo aad
                    rabt inaad ka laabato (payment-ga) waxay qaadan doontaa
                    inaan dib kugu soo celino lacagtaada <strong>24hr</strong>{" "}
                    Gudaheed.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right-terms">
            <img src="../../images/terms.svg" />
          </div>
        </div>{" "}
      </mui.Container>
      <Footer/>
    </>
  );
}
