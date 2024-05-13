import * as React from "react";
import * as mui from "@mui/material";
import * as icons from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Signup from "./Signup";
import UserContextProvider from "../context/UsersContext";
import { UserContext } from "../context/UsersContext";
export default function Login(props) {
  const { findUserCredentials,openLogin,setOpenLogin } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChangeValue = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (Object.keys(data).length == 0) alert("All fields are required");
    else if (data.email == "" || data.password == "")
      alert("All fields are required");
    else findUserCredentials(data);
  };
  return (
    <mui.Container>
      <mui.Dialog
        open={openLogin}
        maxWidth={false}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            width: "950px",
          },
        }}
      >
        <mui.Box sx={{ borderRadius: "20px", background: "white" }}>
          <mui.DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 className="text-color bold">Sign In</h3>

            <mui.IconButton onClick={() => setOpenLogin(false)}>
              <icons.Close className="text-color bold" />
            </mui.IconButton>
          </mui.DialogTitle>
          <mui.Divider />
          <mui.DialogContent>
            <div className="form-control-login">
              <mui.Typography className="text-color bold">
                Email *
              </mui.Typography>
              <input
                name="email"
                onChange={handleChangeValue}
                type="email"
                placeholder="yourgmail.com"
              />
            </div>
            <div className="form-control-login">
              <mui.Typography className="text-color bold">
                Password *
              </mui.Typography>
              <input
                name="password"
                onChange={handleChangeValue}
                type="text"
                placeholder="your passcode"
              />
            </div>
            <mui.Typography sx={{ lineHeight: 1.6 }}>
              I've Forgot My Password? <Link>Request Account Info</Link>
              <br /> Or don't have account?{" "}
              <Link
                onClick={() => {
                  setOpenLogin(false)
                  setOpen(true);
                }}
              >
                Signup
              </Link>{" "}
              All Information will be sent to your email, after checking
            </mui.Typography>

            <mui.Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ background: "#BE5A83", mt: 4 }}
            >
              Login
            </mui.Button>
          </mui.DialogContent>
        </mui.Box>
      </mui.Dialog>

      <UserContextProvider>
        {" "}
        <Signup
          showLogin={setOpenLogin}
          open={open}
          closeClick={() => setOpen(false)}
        />
      </UserContextProvider>
    </mui.Container>
  );
}
