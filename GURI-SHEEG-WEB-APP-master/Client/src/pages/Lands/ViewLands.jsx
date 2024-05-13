import {
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import Header from "../../dashboard/Header";
import SideBar from "../../dashboard/sidebar";
import * as grid from "@mui/x-data-grid";
import { UserContext } from "../../context/UsersContext";
import {
  Delete,
  Edit,
  RemoveRedEye,
  Search,
  ViewAgendaOutlined,
} from "@mui/icons-material";
import AdminModal from "../../Modals/AdminModal";
import swal from "sweetalert";
import { showWarning, showWarningWithResponse } from "../../utilities/Messages";
import { Outlet, useNavigate } from "react-router-dom";
import LandTable from "./components/LandTable";
import { LandContext } from "../../context/LandContext";
export const ViewLands = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [response, setResponse] = useState();
  const { fetchLands, deleteLand } = useContext(LandContext);

  const loadData=async ()=>{
    const {data,message,hasError,error} = await fetchLands();
    setResponse({
      hasError: hasError,
      msg : message,
      error: error
    });
    setData(data);
    console.log("err: ",hasError, "data : ",data)
  }

  useEffect(()=>{
    loadData();
  },[])

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
              <Typography variant="p">View And Manage Lands</Typography>

              <FormControl sx={{ m: 1, width: "740px" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Search
                </InputLabel>
                <Input
                  onChange={(e) => {
                    if (e.target.value == "") fetchUsers();
                  }}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      if (e.target.value != "") {
                        console.log("data", e.target.value);
                        searchUser(e.target.value);
                      } else console.log("not data");
                    }
                  }}
                  placeholder="search user...."
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <div>
                <Button
                  onClick={() => navigate("register")}
                  variant="contained"
                  color="success"
                >
                  Register House
                </Button>
              </div>
            </Paper>

            <Paper
              sx={{
                p: 3,
                "& .header": {
                  backgroundColor: "rgba(255, 7, 0, 0.55)",
                },
              }}
            >
              {response && response?.hasError && (
                <Alert sx={{ mb: 2 }} severity="error">
                  <strong>{`${response?.error} - ${response?.msg}`}</strong>
                </Alert>
              )}
              <LandTable data={data} 
            
              deleteData={(value)=>{
                showWarningWithResponse(loadData,async()=>{
                  var { hasError, message, error } = await deleteLand(value);
                return {hasError, message,error}
                },`Ma Doonaysaa Inaad Tuurtid Dhulkaan Ku Yallo ${value.Dagmada}?`)
              }}/>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
