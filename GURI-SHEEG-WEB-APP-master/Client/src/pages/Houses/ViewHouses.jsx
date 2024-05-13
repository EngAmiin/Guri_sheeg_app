import {
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Grid,
  IconButton,
  Chip,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
  TableFooter,
  TextField,
  FormControl
,
InputLabel,
InputAdornment ,
Input
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
import { showWarning } from "../../utilities/Messages";
import ViewUserDetails from "../../Modals/ViewUserDetails";
import { Outlet, useNavigate } from "react-router-dom";
import { HouseContext } from "../../context/HouseContext";
export const ViewHouses = () => {
    const navigate=useNavigate();
 const { fetchHouses,deleteHouse } = useContext(HouseContext);
 const [data,setData]=useState([]);


 var loadData=async ()=>{
  var data = await fetchHouses();
  setData(data.data.data);
 }
  useEffect(() => {
    loadData();
  }, []);



  const rowsData = [
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
    { name: "ali", email: "aksjaksa", age: 20 },
  ];
  const [rowsPerpage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
              <Typography variant="p">
                View And Manage House(Rooms) Actions
              </Typography>

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
                  onClick={() => navigate("create")}
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
              <Table>
                <TableHead
                  sx={{
                    background: "#8062D6",
                    color: "white",
                    borderRadius: 9,
                  }}
                >
                  <TableCell sx={{ color: "white" }}>House Code Map</TableCell>
                  <TableCell sx={{ color: "white" }}>Address</TableCell>
                  <TableCell sx={{ color: "white" }}>Type</TableCell>
                  <TableCell sx={{ color: "white" }}>Rent</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableHead>
                <TableBody>
                  {(rowsPerpage > 0
                    ? data &&
                      data.slice(
                        page * rowsPerpage,
                        page * rowsPerpage + rowsPerpage
                      )
                    : data
                  ).map((value) => {
                    return (
                      <TableRow>
                        <TableCell>{value.ID}</TableCell>
                        <TableCell>{value.Address}</TableCell>
                        <TableCell>{value.HouseType}</TableCell>
                        <TableCell>${value.MonthlyRent}</TableCell>
                       
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              var response="";
                              showWarning(() => {
                                 deleteHouse(value);
                              });
                            }}
                            color="error"
                          >
                            <Delete />
                          </IconButton>

                          <IconButton
                          title="View This House Details"
                            color="info"
                            onClick={ () => {
                              navigate(`details/${value.ID}`)
                            }}
                          >
                            <RemoveRedEye />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      slots={{ root: "div" }}
                      rowsPerPageOptions={[5, 10, 25, 100]}
                      count={data?.length}
                      rowsPerPage={rowsPerpage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Box>
        </Grid>
      
      </Grid>
    </>
  );
};
