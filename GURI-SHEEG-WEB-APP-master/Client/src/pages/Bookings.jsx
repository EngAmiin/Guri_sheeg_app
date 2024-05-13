import * as React from "react";
import * as mui from "@mui/material";
import Header from "../components/Header";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SellIcon from "@mui/icons-material/Sell";
import HelpIcon from "@mui/icons-material/Help";
import { Link, useNavigate } from "react-router-dom";
import { Favorite, PinDrop, Usb } from "@mui/icons-material";
import { HouseContext } from "../context/HouseContext";
import ReasonModal from "../Modals/ReasonModal";
import UserSideBar from "../components/userSideBar";
import { menuList } from "../userMenusList";
export default function Bookings() {
  const { getBookingByUser, releaseHouse } = React.useContext(HouseContext);
  const [bookings, setBookings] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState({
    open: false,
    targetID: "",
    houseID: "",
  });

  const handleRelease=async(reason)=>{
    if(reason=="")
      alert("Please Choose One")
    else
     {
     var storage = JSON.parse(localStorage.getItem("userData"));
      var data={
        client_id: storage.ID,
      reason: reason,
      reservationId: open.targetID,
      houseId: open.houseID,
      release_date: new Date().toISOString().slice(0,10),


      }
      var response = await releaseHouse(data);
      setMessage(response.data.message);
      loadBookings();
      setOpen(false);
     }
  }

  const loadBookings = async () => {
    var storage = JSON.parse(localStorage.getItem("userData"));
    var response = await getBookingByUser(storage.ID);
   
    setBookings(response.data); 
   (response.data.houseData[0].map(v=> console.log(v)));
  };

  React.useEffect(() => {
    loadBookings();
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
              <UserSideBar menuList={menuList} />
            </mui.Box>
          </mui.Grid>
          <mui.Grid item lg={9}>
            <mui.Container>
              {message && (
                <mui.Alert severity="success" variant="standard" sx={{ mt: 3 }}>
                  <mui.Typography>{message}</mui.Typography>
                </mui.Alert>
              )}
              <mui.Box>
                <mui.Box sx={{ my: 1 }}>
                  <mui.Paper
                    className="profile-content"
                    sx={{ borderRadius: 4 }}
                  >
                    <mui.Typography sx={{ mb: 1 }}>
                      All Your Bookings
                    </mui.Typography>
                    <mui.Divider sx={{ my: 1 }} />
                    {bookings &&
                      bookings.houseData[0].map((house) => {
                        var houseImages = bookings.imagesData.filter(
                          (image) => image.image == house.ID
                        );
                        return (
                          <>
                            <mui.Grid container>
                              <mui.Grid item lg={6}>
                                <mui.Grid container>
                                  {houseImages.map((image) => {
                                    return (
                                      <mui.Grid item lg={6}>
                                        <img
                                          src={`http://localhost:8900/upload/${image.propertyID}`}
                                          style={{
                                            width: "250px",
                                            height: "200px",
                                            borderRadius: 7,
                                          }}
                                        />
                                      </mui.Grid>
                                    );
                                  })}
                                </mui.Grid>
                              </mui.Grid>
                              <mui.Grid item lg={4}>
                                <mui.Typography
                                  sx={{
                                    color: "green",
                                    fontSize: 25,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {house.Address}
                                </mui.Typography>
                                <mui.Typography
                                  sx={{
                                    color: "green",
                                    fontSize: 15,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  {house.Street_address} <PinDrop />
                                </mui.Typography>

                                <mui.Box sx={{ my: 2 }}>
                                  <mui.Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      my: 1,
                                    }}
                                  >
                                    <mui.Typography>
                                      Kirada:{" "}
                                      <strong>${house.MonthlyRent}</strong>
                                      <sub>/month</sub>
                                    </mui.Typography>
                                    <mui.Typography>
                                      Hormarin:{" "}
                                      <strong>${house.Hormarin}</strong>
                                    </mui.Typography>
                                  </mui.Box>
                                  <mui.Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      my: 1,
                                    }}
                                  >
                                    <mui.Typography>
                                      Nooca: <strong>{house.HouseType}</strong>
                                    </mui.Typography>
                                  </mui.Box>
                                  <mui.Typography>
                                    Reserved:{" "}
                                    <strong>{house.reserved_date}</strong>
                                  </mui.Typography>
                                  <mui.Button
                                    color="error"
                                    variant="contained"
                                    onClick={() =>
                                      setOpen({
                                        ...open,
                                        open: true,
                                        targetID: house.id,
                                        houseID: house.ID,
                                      })
                                    }
                                  >
                                    Release
                                  </mui.Button>
                                </mui.Box>
                              </mui.Grid>
                            </mui.Grid>
                            <mui.Divider sx={{ my: 2 }} />
                          </>
                        );
                      })}
                  </mui.Paper>
                </mui.Box>
                {/* p-data-end */}
              </mui.Box>
            </mui.Container>
          </mui.Grid>
        </mui.Grid>
        <ReasonModal
          open={open.open}
          close={() =>
            setOpen({
              ...open,
              open: false,
            })
          }
          handleClick={handleRelease}
        />
      </mui.Box>
    </>
  );
}
