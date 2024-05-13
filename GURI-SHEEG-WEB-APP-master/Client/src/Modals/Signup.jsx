import * as React from "react";
import * as mui from "@mui/material";
import * as icons from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "./Login";
import { UserContext } from "../context/UsersContext";


export default function Signup(props) {
     const [openMode, setOpenMode] = React.useState(false);
     const [hasReaded, setHasReaded] = React.useState(false);
    const [data,setData]=React.useState({
      username: "",
      fullname: "",
      email: "",
      mobile: "",
      address: "",
      region: "",
      gender: "",
      password: "",
    });

    const {RegisterUser,openLogin,setOpenLogin}=React.useContext(UserContext);

    const handleChangeValue=(e)=>{

      if(e.target.name=="profile")
      setData({
        ...data,
       [e.target.name]: e.target.files[0]
      })
      
      else
       setData({
        ...data,
       [e.target.name]: e.target.value
      })
    

    }

    const handleSubmit=()=>{

      if(Object.keys(data).length==0)
        alert("All fields are required");
      else if (
        data.username == "" ||
        data.email == "" ||
        data.fullname == "" ||
        data.password == "" ||
        data.mobile == "" ||
        data.address == "" ||
        data.region == "" ||
        data.gender == ""
      )
        alert("All fields are required");
      else {
            var formData = new FormData();
            formData.append("fullname", data.fullname);
            formData.append("Username", data.username);
            formData.append("email", data.email);
            formData.append("mobile", data.mobile);
            formData.append("address", data.address);
            formData.append("region", data.region);
            formData.append("password", data.password);
            formData.append("gender", data.gender);
            formData.append("type", "User");
            if (data.profile) formData.append("profile", data.profile);
            console.log(data);
            RegisterUser(formData);
      }

  

    }
  return (
    <mui.Container>
      <mui.Dialog
        onClose={props.closeClick}
        open={props.open}
        maxWidth={false}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            width: "950px",
            heigh: "950px",
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
            <h3 className="text-color bold">Sign Up</h3>

            <mui.IconButton onClick={props.closeClick}>
              <icons.Close className="text-color bold" />
            </mui.IconButton>
          </mui.DialogTitle>
          <mui.Divider />
          <mui.DialogContent>
            <div className="form-group">
              <div className="form-control-login">
                <mui.Typography className="text-color bold">
                  FullName *
                </mui.Typography>
                <input
                  onChange={handleChangeValue}
                  type="email"
                  placeholder="yourgmail.com"
                  name="fullname"
                />
              </div>
              <div className="form-control-login">
                <mui.Typography className="text-color bold">
                  Gender *
                </mui.Typography>
                <select name="gender" onChange={handleChangeValue}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-control-login">
                <mui.Typography className="text-color bold">
                  Username *
                </mui.Typography>
                <input
                  name="username"
                  onChange={handleChangeValue}
                  type="email"
                  placeholder="yourgmail.com"
                />
              </div>
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
            </div>
            <div className="form-group">
              <div className="form-control-login">
                <mui.Typography className="text-color bold">
                  Mobile *
                </mui.Typography>
                <input
                  name="mobile"
                  onChange={handleChangeValue}
                  type="email"
                  placeholder="yourgmail.com"
                />
              </div>
              <div className="form-control-login">
                <mui.Typography className="text-color bold">
                  Address
                </mui.Typography>
                <input
                  name="address"
                  onChange={handleChangeValue}
                  type="email"
                  placeholder="yourgmail.com"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-control-login">
                <mui.Typography className="text-color bold">
                  Region/City *
                </mui.Typography>
                <input
                  name="region"
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
                  type="email"
                  placeholder="yourgmail.com"
                />
              </div>
            </div>
            <div class="image-area-content">
              <div class="displayer-image">
                <img src="../../images/profile.png" class="view-image" alt="" />
                <label for="file">
                  <img src="../../images/cl.png" class="icon-image" alt="" />
                </label>
              </div>
              <div class="fil">
                <input
                  onChange={handleChangeValue}
                  type="file"
                  hidden
                  name="profile"
                  id="file"
                />
              </div>
            </div>

            <mui.Typography
              sx={{ lineHeight: 1.6, display: "flex", alignItems: "center" }}
            >
              <label>
                {" "}
                <input
                  type="checkbox"
                  style={{ scale: "1.6", marginRight: 10 }}
                />{" "}
                I've Read and And accept terms and conditions?
              </label>
            </mui.Typography>

            <mui.Typography sx={{ lineHeight: 1.6 }}>
              I've an account?{" "}
              <Link
                onClick={() => {
                    props.showLogin(true);
                  props.closeClick();
               
                }}
              >
                Login
              </Link>
            </mui.Typography>

            <mui.Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ background: "#BE5A83", mt: 4 }}
            >
              Signup
            </mui.Button>
          </mui.DialogContent>
        </mui.Box>
      </mui.Dialog>
    </mui.Container>
  );
}
