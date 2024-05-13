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
import { v4 as uuidv4 } from "uuid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LandContext } from "../../context/LandContext";
export const CreateLand = () => {
  const [propertyImages, setPropertyImages] = react.useState();
  const [images, setImages] = react.useState(null);
  const [allData, setAllData] = react.useState();
  const [Sabarloogo, setSabrLoogo] = react.useState(false);
  const [loading, setLoading] = react.useState(false);
  const [response, setResponse] = react.useState(null);

  const {createLand}=react.useContext(LandContext);


  const changeFiles = (e) => {
    setImages(e.target.files[0]);
    var url=URL.createObjectURL(e.target.files[0]);
    setPropertyImages(url);
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
    formData.append("size", allData.size);
    formData.append("lacagta", allData.lacagta);
    formData.append("sabarLoogo", Sabarloogo ? "Haa" : "Maya");
    formData.append("jihooyin", allData.jihooyin);
    formData.append("description", allData.description);
    formData.append("fullName", allData.fullName);
    formData.append("gender", allData.gender);
    formData.append("mobile", allData.mobile);
    formData.append("owner_address", allData.owner_address);
    formData.append("owner_region", allData.owner_region);
    formData.append("owner_description", allData.owner_description);
    formData.append("property_type", "land");
    formData.append("date", todayDate);
    formData.append("id", `LD-${uuidv4()}`);
    formData.append("image", images);
 

    var {response,normalMessage} = await createLand(formData);
    setResponse(response.data);
    setLoading(false);
    setPropertyImages(null);

    setTimeout(() => {
      setResponse(null);
    }, 5000);
  };

  const navigate = useNavigate();
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
                  <Alert severity={response?.hasError ? "error" :  "success"}>
                    <AlertTitle>GURI-SHEEG</AlertTitle>
                    <Typography>
                      {response?.message}
                      <strong>
                        <Link to={"/lands"}>View Details</Link>
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
                  Xogta Dhulka{" "}
                </h2>
                <IconButton color="success" onClick={() => navigate("/lands")}>
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
                  <label className="label-houses">Size</label>
                  <TextField
                    onChange={changeAllData}
                    name="size"
                    type="text"
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="Villa, Bacweeyne, etc "
                    className="form-control-input-houses"
                  />
                </Grid>
                <Grid item lg={6}>
                  <label className="label-houses">Lacagta</label>
                  <TextField
                    onChange={changeAllData}
                    name="lacagta"
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
                      onChange={() => setSabrLoogo(!Sabarloogo)}
                      type="checkbox"
                      className="checkbox-style"
                    />
                    Sabarloogo Ma Leeyahay Dhulka?{" "}
                  </label>
                </Grid>

                <Grid item lg={12}>
                  <label className="label-houses">
                    Qeex Afarta Jiha Dhulka Waxa Ka Xiga
                    (Waqooy,Koonfur,Galbbed,Bari){" "}
                  </label>
                  <TextField
                    onChange={changeAllData}
                    name="jihooyin"
                    type="text"
                    multiline
                    sx={{ mt: 1 }}
                    size="medium"
                    placeholder="isticmaal calamadda comma (,) Si aad u xareeysid jihooyinka dhulka."
                    className="form-control-input-houses"
                  />
                  <label>U kala hormari (waqooy,koonfur,galbeed,bari)</label>
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
                    Property Image (At least & Maximum One Image) *{" "}
                  </label>
                  <FormControl
                    sx={{ mt: 3 }}
                    className="form-control-input-houses"
                    variant="filled"
                  >
                    <input
                      
                      name="propertyImages"
                      onChange={changeFiles}
                      type="file"
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12}>
                  <Grid container columnSpacing={5} rowSpacing={5}>
                   
                          <Grid item lg={3}>
                            <img
                              src={propertyImages}
                              style={{
                                width: "100%",
                                height: "230px",
                                borderRadius: 20,
                              }}
                            />
                            </Grid>

                         
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
                Xogta Qofka iska leh Dhulka Ama Masuul Ka Ah{" "}
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
