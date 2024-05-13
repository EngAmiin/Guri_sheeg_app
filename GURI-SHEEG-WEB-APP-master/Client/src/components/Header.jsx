import * as React from "react";
import * as router from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, IconButton } from "@mui/material";
import Login from "../Modals/Login";
import { UserContext } from "../context/UsersContext";
import { Logout } from "@mui/icons-material";
export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState();
  const navigate=router.useNavigate();
  const {openLogin,setOpenLogin}=React.useContext(UserContext);
  const location=router.useLocation();

  React.useEffect(()=>{
   const intervalID=setInterval(()=>{
 if(localStorage.getItem("userData"))
    {
var json = JSON.parse(localStorage.getItem("userData"));
setActiveUser(json);
    }
   
   },10)

   return ()=>clearInterval(intervalID);
    
  },[])
  return (
    <div className="header-container">
      <div className="inner-container">
        <div className="brand">
          {/* <img src='../../images/logo-png.png'/> */}
          <router.Link to={"/"}>GURI SHEEG</router.Link>
        </div>

        <div className="center-menu">
          <div className="menu-item">
            <FavoriteBorderIcon />
            <router.Link className="fav" to={'/user/Favorites'}>Favorite</router.Link>
          </div>
          <div className="menu-item">
            <router.Link to={'/user/bookings'}>Bookings</router.Link>
          </div>
        </div>
        <div className="right-menu">
          {!localStorage.getItem("userData") && (
            <>
              {" "}
              <div className="menu-item">
                <router.Link
                  className="login"
                  onClick={() => setOpenLogin(true)}
                >
                  Login
                </router.Link>
              </div>
              <div className="menu-item">
                <router.Link>Signup</router.Link>
              </div>
            </>
          )}

          <div className="menu-item">
            {localStorage.getItem("userData") && (
              <router.Link className="fav" to={"/profile"}>
                {activeUser && (
                  activeUser.Profile == "null" ? (
                    <Avatar>{activeUser.Username.substring(0, 2)}</Avatar>
                  ) : (
                    <Avatar
                      src={`http://localhost:8900/profiles/${activeUser.Profile}`}
                    ></Avatar>
                  )
                ) }
              </router.Link>
            )}
            {localStorage.getItem("userData") && (
              <IconButton
                color="error"
                onClick={() => {
                  localStorage.clear();
                setActiveUser(null);
                navigate(`${location.pathname}`);
                }}
              >
                <Logout />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <Login open={open} setOpen={setOpen} />
    </div>
  );
}
