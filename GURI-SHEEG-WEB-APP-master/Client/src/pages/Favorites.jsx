import * as React from "react";
import * as mui from "@mui/material";
import Header from "../components/Header";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SellIcon from "@mui/icons-material/Sell";
import HelpIcon from "@mui/icons-material/Help";
import { Link, useNavigate } from "react-router-dom";
import { Close, Favorite, PinDrop, Usb } from "@mui/icons-material";
import { HouseContext } from "../context/HouseContext";
import ReasonModal from "../Modals/ReasonModal";
import * as toasts from "react-hot-toast";
import UserSideBar from "../components/userSideBar";
import { menuList } from "../userMenusList";
export default function Favorites() {
  const [fav, setFav] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const deleteFavorite = (fav) => {
    var favs = JSON.parse(localStorage.getItem("fav") || "[]");
    var newFav = favs.filter((f) => f.ID != fav.ID);

    localStorage.setItem("fav", JSON.stringify(newFav));
    favs = JSON.parse(localStorage.getItem("fav") || "[]");
    setFav(favs);

    toasts.toast.success("Removed From Favorites");
  };

  React.useEffect(() => {
    setTimeout(() => {
      var favs = JSON.parse(localStorage.getItem("fav") || "[]");
      setFav(favs);
      setLoad(true);
    }, 3000);
  }, []);
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
              <UserSideBar menuList={menuList}/>
            </mui.Box>
          </mui.Grid>
          <mui.Grid item lg={9}>
            <mui.Container>
              <toasts.Toaster position="top-center" />
              <mui.Box>
                <mui.Box sx={{ my: 1 }}>
                  <mui.Paper
                    className="profile-content"
                    sx={{ borderRadius: 4 }}
                  >
                    <mui.Typography
                      sx={{
                        mb: 1,
                        fontFamily: "Poppins",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      My Favorites <Favorite />
                    </mui.Typography>
                    <mui.Divider sx={{ my: 1 }} />

                    {load ? (
                      fav.length > 0 ? (
                        fav.map((f) => {
                          return (
                            <div className="fav-bg">
                              <mui.Box sx={{ p: 2 }}>
                                <mui.Typography
                                  sx={{
                                    fontFamily: "Poppins",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  {f.Address}{" "}
                                  <mui.IconButton
                                    color="error"
                                    onClick={() => deleteFavorite(f)}
                                  >
                                    {" "}
                                    <Close />
                                  </mui.IconButton>
                                </mui.Typography>
                                <mui.Typography sx={{}}>
                                  {f.Street_address}
                                </mui.Typography>
                                <mui.Divider sx={{ my: 1 }} />

                                <mui.Typography sx={{}}>
                                  Rent:<strong> ${f.MonthlyRent}</strong>
                                </mui.Typography>
                              </mui.Box>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no-data">
                          <img
                            src="../../images/no.svg"
                            style={{ width: "200px", height: "200px" }}
                          />
                          <mui.Typography
                            sx={{
                              fontFamily: "poppins",
                              my: 4,
                              color: "#b92b27" /* fallback for old browsers */,
                              color:
                                "-webkit-linear-gradient(to right, #1565C0, #b92b27)" /* Chrome 10-25, Safari 5.1-6 */,
                              color:
                                "linear-gradient(to right, #1565C0, #b92b27)",
                            }}
                          >
                            No Favorites
                          </mui.Typography>
                        </div>
                      )
                    ) : (
                      <mui.Backdrop open={true} enter={true}>
                        <mui.CircularProgress color="info" />
                      </mui.Backdrop>
                    )}
                  </mui.Paper>
                </mui.Box>
              </mui.Box>
            </mui.Container>
          </mui.Grid>
        </mui.Grid>
      </mui.Box>
    </>
  );
}
