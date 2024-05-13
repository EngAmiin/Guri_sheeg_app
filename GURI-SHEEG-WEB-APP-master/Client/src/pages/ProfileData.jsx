import React, { useContext, useEffect, useState } from "react";
import * as mui from "@mui/material";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { HideImage, VerifiedUser } from "@mui/icons-material";
import Person2Icon from "@mui/icons-material/Person2";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfileData, hasData } from "../utilities/LocalStorage";
import { UserContext } from "../context/UsersContext";
import Header from "../components/Header";
import NotFound from "./NotFound";
import UserSideBar from "../components/userSideBar";
import { menuList } from "../userMenusList";
export default function ProfileData() {
  const { responseServer, setResponseServer, UpdateUser } =
    useContext(UserContext);
  const [profileData, setprofileData] = useState();
  const [updatedFile, setUpdatedFile] = useState("");

  const navigate = useNavigate();
  const onChange = (e) => {
    setprofileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeFile = (e) => {
    setUpdatedFile({
      [e.target.name]: e.target.files[0],
    });
  };

  const updateUserProfile = () => {
    var formData = new FormData();
    formData.append("FullName", profileData.FullName);
    formData.append("Username", profileData.Username);
    formData.append("Email", profileData.Email);
    formData.append("Region", profileData.Region);
    formData.append("Address", profileData.Address);
    formData.append("Mobile", profileData.Mobile);
    formData.append("Password", profileData.Password);
    formData.append("Profile", profileData.Profile);
    formData.append("profile_update", updatedFile.profile_update);
    formData.append("ID", profileData.ID);
    formData.append("type", "update");
    UpdateUser(formData);
    // console.log(profileData)
    // console.log(updatedFile)
  };


  useEffect(()=>{
    setprofileData(getUserProfileData());
  },[])
  

  return profileData ? (
    <>
      {" "}
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
              <mui.Box>
                <mui.Box sx={{ my: 4 }}>
                  <mui.Paper
                    className="profile-content"
                    sx={{ borderRadius: 4 }}
                  >
                    {responseServer && (
                      <mui.Alert severity="success" sx={{ mb: 3 }}>
                        <mui.Typography>
                          {responseServer}
                          <strong>
                            <Link>View </Link>
                          </strong>
                        </mui.Typography>
                      </mui.Alert>
                    )}
                    <mui.Grid container>
                      <mui.Grid item lg={4}>
                        <div className="profile-image-user">
                          <div className="user-image">
                            <img
                              src={
                                "http://localhost:8900/profiles/" +
                                profileData?.Profile
                              }
                            />

                            <input
                              type="file"
                              onChange={onChangeFile}
                              name="profile_update"
                              hidden
                              id="user-profile-file"
                            />
                            <label for="user-profile-file">
                              <PublishedWithChangesIcon
                                color="info"
                                className="icon-profile-upload"
                              />
                            </label>
                          </div>
                          <div className="info">
                            <mui.Typography
                              sx={{
                                color: "#BE5A83",
                                fontFamily: "poppins",
                              }}
                            >
                              {profileData.FullName}
                            </mui.Typography>
                          </div>
                        </div>
                      </mui.Grid>
                      <mui.Grid item lg={8}>
                        <mui.Box sx={{ ml: 4 }}>
                          <mui.Grid container>
                            <mui.Grid item lg={6} sx={{ mb: 2 }}>
                              <mui.FormControl>
                                <mui.Input
                                  value={profileData.FullName}
                                  name="FullName"
                                  onChange={onChange}
                                  placeholder="FullName"
                                  type="text"
                                  endAdornment={
                                    <mui.InputAdornment position="start">
                                      <Person2Icon />
                                    </mui.InputAdornment>
                                  }
                                />
                              </mui.FormControl>
                            </mui.Grid>
                            <mui.Grid item lg={6} sx={{ mb: 2 }}>
                              <mui.FormControl fullWidth>
                                <mui.Input
                                  value={profileData.Username}
                                  name="Username"
                                  onChange={onChange}
                                  placeholder="Username"
                                  type="text"
                                />
                              </mui.FormControl>
                            </mui.Grid>
                            <mui.Grid item lg={6} sx={{ mb: 2 }}>
                              <mui.FormControl>
                                <mui.Input
                                  type="email"
                                  value={profileData.Email}
                                  name="Email"
                                  onChange={onChange}
                                  placeholder="Email"
                                />
                              </mui.FormControl>
                            </mui.Grid>

                            <mui.Grid item lg={6} sx={{ mb: 2 }}>
                              <mui.FormControl fullWidth>
                                <mui.Input
                                  value={profileData.Password}
                                  name="Password"
                                  onChange={onChange}
                                  type="password"
                                  endAdornment={
                                    <mui.InputAdornment position="start">
                                      <mui.IconButton>
                                        <HideImage />
                                      </mui.IconButton>
                                    </mui.InputAdornment>
                                  }
                                  placeholder="Password"
                                />
                              </mui.FormControl>
                            </mui.Grid>
                            <mui.Grid item lg={6} sx={{ mb: 2 }}>
                              <mui.FormControl>
                                <mui.Input
                                  name="Region"
                                  onChange={onChange}
                                  type="text"
                                  value={profileData.Region}
                                  placeholder="Region/City"
                                />
                              </mui.FormControl>
                            </mui.Grid>
                            <mui.Grid item lg={6} sx={{ mb: 2 }}>
                              <mui.FormControl fullWidth>
                                <mui.Input
                                  name="Address"
                                  onChange={onChange}
                                  type="text"
                                  value={profileData.Address}
                                  placeholder="Address"
                                />
                              </mui.FormControl>
                            </mui.Grid>
                            <mui.Grid item lg={12} sx={{ mb: 2 }}>
                              <mui.FormControl fullWidth>
                                <mui.Input
                                  type="number"
                                  name="Mobile"
                                  onChange={onChange}
                                  value={profileData.Mobile}
                                  placeholder="Mobile"
                                />
                              </mui.FormControl>
                            </mui.Grid>
                          </mui.Grid>
                          <mui.Button
                            variant="contained"
                            color="primary"
                            onClick={updateUserProfile}
                          >
                            Save changes
                          </mui.Button>
                        </mui.Box>
                      </mui.Grid>
                    </mui.Grid>
                  </mui.Paper>
                  <mui.Alert severity="info" sx={{ mt: 3 }}>
                    <mui.Typography>
                      New Land Properties Are Available check the updates And
                      get interest
                      <strong>
                        <Link>View </Link>
                      </strong>
                    </mui.Typography>
                  </mui.Alert>
                </mui.Box>
                {/* p-data-end */}
              </mui.Box>
            </mui.Container>
          </mui.Grid>
        </mui.Grid>
      </mui.Box>
    </>
  ) : (
    <NotFound />
  );
}
