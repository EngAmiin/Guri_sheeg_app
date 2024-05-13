import {
  Paper,
  Grid,
  Box,
  Typography,
  Input,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Divider,
  MenuItem,
  Button,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import SideBar from "../../dashboard/sidebar";
import Header from "../../dashboard/Header";
import * as react from "react";
import { ArrowLeft, Remove } from "@mui/icons-material";
import uniqueId from "lodash.uniqueid";
import { all } from "axios";
import { HouseContext } from "../../context/HouseContext";
import { v4 as uuidv4 } from "uuid";
import { Link, Navigate, useNavigate } from "react-router-dom";
export const CreateHouse = () => {
  const [propertyImages, setPropertyImages] = react.useState([]);
  const [images, setImages] = react.useState(null);
  const [allData, setAllData] = react.useState();
  const [hasDisable, setHasDisable] = react.useState(true);
  const [loading,setLoading] = react.useState(false);
  const [response,setResponse] = react.useState(null);

  const { CreateHouse } = react.useContext(HouseContext);

  const changeFiles = (e) => {
    setImages(e.target.files);
    const selectFiles = Array.from(e.target.files);
    setPropertyImages((prev) => prev.concat(selectFiles));
  };
  const changeAllData = (e) => {
    setAllData({
      ...allData,
      [e.target.name]: e.target.value,
    });
  };

  const hanldeSubmit = async (e) => {
    setLoading(true);
    var todayDate = new Date().toISOString().slice(0, 10);

    var formData = new FormData();

    formData.append("address", allData.address);
    formData.append("street_address", allData.street_address);
    formData.append("house_type", allData.house_type);
    formData.append("rent_money", allData.rent_money);
    formData.append("hormarin", allData.hormarin);
    formData.append("map_address", allData.map_address);
    formData.append("description", allData.description);
    formData.append("fullName", allData.fullName);
    formData.append("gender", allData.gender);
    formData.append("mobile", allData.mobile);
    formData.append("owner_address", allData.owner_address);
    formData.append("owner_region", allData.owner_region);
    formData.append("owner_description", allData.owner_description);
    formData.append("property_type", "house");
    formData.append("date", todayDate);
    formData.append("id", `HC-${uuidv4()}`);

    for (var i = 0; i < propertyImages.length; i++) {
      formData.append("propertyImages", propertyImages[i]);
    }

    var response=await CreateHouse(formData);
    setResponse(response.data);
    setLoading(false);
    setPropertyImages([]);

    setTimeout(() => {
      setResponse(null)
    },5000);

    console.log(propertyImages);
  };

  const navigate=useNavigate();
  return (
    <>
      <Grid container>
        <SideBar />
        <Grid item lg={10}>
          <Header />
          <Box sx={{ mx: 1, my: 3 }}>
            <Paper
              sx={{
                p: 2,
                my: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="p" color={"#461959"}>
                Please fill carefully required data that is marked (*)
              </Typography>
            </Paper>

            <Paper
              sx={{
                mb: 3,
                p: 3,
                "& .header": {
                  backgroundColor: "rgba(255, 7, 0, 0.55)",
                },
              }}
            >
              <Box sx={{ my: 2 }}>
                {response && (
                  <Alert severity={response?.hasError ? "error" : "success"}>
                    <AlertTitle>GURI-SHEEG</AlertTitle>
                    <Typography>
                      {response?.message}{" "}
                      <strong>
                        <Link to={"/houses"}>View Details</Link>
                      </strong>
                    </Typography>
                  </Alert>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    marginBottom: "14px",
                  }}
                >
                  Xogta Guriga{" "}
                </h2>
                <IconButton color="success" onClick={() => navigate("/houses")}>
                  <ArrowLeft fontSize="large" />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Grid container columnSpacing={10} rowSpacing={3}>
                <Grid item lg={6}>
                  <label className="label-houses">Address *</label>
                  <TextField
                    onChange={changeAllData}
                    name="address"
                    type="text"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Dagmada Hodan, Mogadishu"
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">
                    Meesha uu Udhowyhy (Address) *
                  </label>
                  <TextField
                    onChange={changeAllData}
                    type="text"
                    name="street_address"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Wadada Makka Al Mukkarama "
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">Nooca Guriga *</label>
                  <TextField
                    onChange={changeAllData}
                    name="house_type"
                    type="text"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Villa, Bacweeyne, etc "
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">
                    Lacagta Kirada (Monthly Rent) *
                  </label>
                  <TextField
                    onChange={changeAllData}
                    name="rent_money"
                    type="number"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Villa, Bacweeyne, etc "
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">
                    <input
                      onChange={() => setHasDisable(!hasDisable)}
                      type="checkbox"
                      className="checkbox-style"
                    />
                    Carbuun{" "}
                  </label>
                  <TextField
                    onChange={changeAllData}
                    name="hormarin"
                    type="number"
                    disabled={hasDisable ? true : false}
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Villa, Bacweeyne, etc "
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">Map (Address) </label>
                  <TextField
                    onChange={changeAllData}
                    name="map_address"
                    type="text"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.2901911168456!2d45."
                    className="form-control-input-houses"
                  />
                  <label>Google map kasoo qaado link-ga guriga map-kiisa</label>
                </Grid>
                <Grid item lg={12}>
                  <label className="label-houses">Description </label>
                  <TextField
                    onChange={changeAllData}
                    name="description"
                    type="text"
                    multiline
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Faahfaahin dheeraad ah, Qeex Guriga Waxay kor uqaadaysaa fahanka qofka kireeysanayo."
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={12}>
                  <label className="label-houses">
                    Property Images (At least One Image and Maximum 4 images) *{" "}
                  </label>
                  <FormControl
                    sx={{ mt: 3 }}
                    className="form-control-input-houses"
                    variant="filled"
                  >
                    <input
                      multiple
                      name="propertyImages"
                      onChange={changeFiles}
                      type="file"
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12}>
                  <Grid container columnSpacing={5} rowSpacing={5}>
                    {propertyImages &&
                      propertyImages.map((image) => {
                        const url = URL.createObjectURL(image);
                        return (
                          <Grid item lg={3}>
                            <img
                              src={url}
                              style={{
                                width: "100%",
                                height: "230px",
                                borderRadius: 20,
                              }}
                            />

                            <Button
                              color="error"
                              variant="outlined"
                              onClick={() => {
                                const newArray = propertyImages.filter(
                                  (e) => e != image
                                );
                                setPropertyImages(newArray);
                              }}
                            >
                              remove
                            </Button>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper
              sx={{
                p: 3,
                "& .header": {
                  backgroundColor: "rgba(255, 7, 0, 0.55)",
                },
              }}
            >
              <h2
                style={{
                  marginBottom: "14px",
                }}
              >
                Xogta Qofka iska leh guriga{" "}
              </h2>
              <Divider sx={{ mb: 3 }} />
              <Grid container columnSpacing={10} rowSpacing={3}>
                <Grid item lg={6}>
                  <label className="label-houses">FullName *</label>
                  <TextField
                    onChange={changeAllData}
                    name="fullName"
                    type="text"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Dagmada Hodan, Mogadishu"
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">Gender</label>
                  <TextField
                    name="gender"
                    type="text"
                    onChange={changeAllData}
                    select
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Wadada Makka Al Mukkarama "
                    className="form-control-input-houses"
                    defaultValue={"male"}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    {/* <MenuItem>Female</MenuItem> */}
                  </TextField>
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">Mobile *</label>
                  <TextField
                    name="mobile"
                    type="number"
                    onChange={changeAllData}
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="+252-xxxxxxx"
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">Address *</label>
                  <TextField
                    name="owner_address"
                    onChange={changeAllData}
                    type="text"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Hodan, Mogadishu"
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={12}>
                  <label className="label-houses">Region </label>
                  <TextField
                    name="owner_region"
                    type="text"
                    onChange={changeAllData}
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Banadir/Mogadishu"
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={12}>
                  <label className="label-houses">Description </label>
                  <TextField
                    onChange={changeAllData}
                    name="owner_description"
                    multiline
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Other Descriptions"
                    className="form-control-input-houses"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Button
              disabled={loading ? true : false}
              onClick={hanldeSubmit}
              variant="contained"
              sx={{ mt: 4, width: "170px", p: 2 }}
              color="success"
            >
              {loading ? "Process..." : "Save"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
