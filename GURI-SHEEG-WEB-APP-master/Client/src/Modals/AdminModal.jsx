
import * as React from "react";
import * as mui from "@mui/material";
import * as icons from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Login from "./Login";
import { UserContext } from "../context/UsersContext";

export default function AdminModal(props) {
  const [openMode, setOpenMode] = React.useState(false);
  const [data, setData] = React.useState({
    username: "",
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    region: "",
    gender: "",
    password: "",
  });

  const { RegisterUser, openLogin, setOpenLogin,fetchUsers } =
    React.useContext(UserContext);

  const handleChangeValue = (e) => {
    if (e.target.name == "profile")
      setData({
        ...data,
        [e.target.name]: e.target.files[0],
      });
    else
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = () => {
    if (Object.keys(data).length == 0) alert("All fields are required");
    else if (
      data.username == "" ||
      data.email == "" ||
      data.fullname == "" ||
      data.password == "" 
    )
      alert("All Star Flags  are required");
    else {
      var formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("address", data.address);
      formData.append("region", data.region);
      formData.append("password", data.password);
      formData.append("gender", data.gender);
      formData.append("type", "Admin");
      if (data.profile) formData.append("profile", data.profile);
     
      RegisterUser(formData);
      
    }
  };
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
            <div>
              <h3 className="text-color bold">Admin Details</h3>
              <mui.Typography>this is only based on admin, not user!</mui.Typography>
            </div>

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
                  Username *
                </mui.Typography>
                <input
                  name="username"
                  onChange={handleChangeValue}
                  type="email"
                  placeholder="yourgmail.com"
                />
              </div>
            </div>
            <div className="form-group">
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

            <mui.Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ background: "#BE5A83", mt: 4 }}
            >
              Create
            </mui.Button>
          </mui.DialogContent>
        </mui.Box>
      </mui.Dialog>
    </mui.Container>
  );
}
