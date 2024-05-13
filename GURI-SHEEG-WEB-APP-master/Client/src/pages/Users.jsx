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

import Header from "../dashboard/Header";
import SideBar from "../dashboard/sidebar";
import * as grid from "@mui/x-data-grid";
import { UserContext } from "../context/UsersContext";
import {
  Delete,
  Edit,
  RemoveRedEye,
  Search,
  ViewAgendaOutlined,
} from "@mui/icons-material";
import AdminModal from "../Modals/AdminModal";
import swal from "sweetalert";
import { showWarning } from "../utilities/Messages";
import ViewUserDetails from "../Modals/ViewUserDetails";
export const Users = () => {
  const {
    userData,
    fetchUsers,
    deleteUser,
    fetchUser,
    singleUserData,
    searchUser,
  } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openviewUser, setOpenViewUser] = useState(false);
  useEffect(() => {
    fetchUsers();
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
            <Typography variant="p">View And Manage Users List</Typography>

            <FormControl sx={{ m: 1, width: "740px" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Search
              </InputLabel>
              <Input
              onChange={(e)=>{
                if (e.target.value == "") fetchUsers();

              }}
              onKeyDown={(e)=>{
                if(e.key=="Enter"){
                  if(e.target.value!="")
                   {
                     console.log("data",e.target.value);
                    searchUser(e.target.value);}
                  else
                   console.log("not data")
                }
               
              }}
                placeholder="search user...."
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <div>
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                color="success"
              >
                Add Admin
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
                sx={{ background: "#8062D6", color: "white", borderRadius: 9 }}
              >
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Username</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Type</TableCell>
                <TableCell sx={{ color: "white" }}>Mobile</TableCell>
                <TableCell sx={{ color: "white" }}>Region</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableHead>
              <TableBody>
                {(rowsPerpage > 0
                  ? userData &&
                    userData.slice(
                      page * rowsPerpage,
                      page * rowsPerpage + rowsPerpage
                    )
                  : userData
                ).map((value) => {
                  return (
                    <TableRow>
                      <TableCell>{value.ID}</TableCell>
                      <TableCell>{value.FullName}</TableCell>
                      <TableCell>{value.Username}</TableCell>
                      <TableCell>{value.Email}</TableCell>
                      {value.Type == "Admin" ? (
                        <TableCell>
                          <Chip
                            label={value.Type}
                            variant="filled"
                            color="success"
                          />
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Chip
                            clickable
                            label={value.Type}
                            variant="filled"
                            color="primary"
                          />
                        </TableCell>
                      )}

                      {value.Mobile == "" ? (
                        <TableCell>
                          <Chip label="null" variant="filled" color="info" />
                        </TableCell>
                      ) : (
                        <TableCell>{value.Mobile}</TableCell>
                      )}

                      {/* <TableCell>{value.Mobile}</TableCell> */}
                      {value.Region == "" ? (
                        <TableCell>
                          <Chip label="null" variant="filled" color="info" />
                        </TableCell>
                      ) : (
                        <TableCell>{value.Region}</TableCell>
                      )}
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            showWarning(() => {
                              deleteUser({
                                ID: value.ID,
                              });
                            });
                          }}
                          color="error"
                        >
                          <Delete />
                        </IconButton>

                        <IconButton
                          color="info"
                          onClick={async () => {
                            await fetchUser(value.ID);
                            console.log(singleUserData);
                            setOpenViewUser(true);
                          }}
                        >
                          <RemoveRedEye />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* {rowsData.map((value) => {
                  return (
                    <TableRow>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.email}</TableCell>
                      <TableCell>{value.age}</TableCell>
                    </TableRow>
                  );
                })} */}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    slots={{ root: "div" }}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    count={rowsData.length}
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
      <ViewUserDetails
        data={singleUserData}
        open={openviewUser}
        close={() => setOpenViewUser(false)}
      />
      <AdminModal open={open} closeClick={() => setOpen(false)} />
    </Grid>
  );
};
