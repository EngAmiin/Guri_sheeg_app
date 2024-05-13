import React,{useState,useEffect,useContext} from 'react'
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
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
} from "@mui/material";
import { Delete, RemoveRedEye } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
export default function LandTable({ data, deleteData, viewData }) {
  const navigate=useNavigate();
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
    <Table>
      <TableHead
        sx={{
          background: "#8062D6",
          color: "white",
          borderRadius: 9,
        }}
      >
        <TableCell sx={{ color: "white" }}>Address</TableCell>
        <TableCell sx={{ color: "white" }}>Size</TableCell>
        <TableCell sx={{ color: "white" }}>Lacagta ($)</TableCell>
        <TableCell sx={{ color: "white" }}>Claimed</TableCell>
        <TableCell sx={{ color: "white" }}>Reserved</TableCell>
        <TableCell sx={{ color: "white" }}>Actions</TableCell>
      </TableHead>
      <TableBody>
        {(rowsPerpage > 0
          ? data &&
            data.slice(page * rowsPerpage, page * rowsPerpage + rowsPerpage)
          : data
        ).map((value) => {
          return (
            <TableRow>
              <TableCell>{value.Dagmada}</TableCell>
              <TableCell>{value.Size}</TableCell>
              <TableCell>
                <strong>${value.Lacagta.toFixed(2)}</strong>
              </TableCell>
              <TableCell>
                {value.Claimed == "" ? (
                  <Chip clickable color="info" label={"Still"} />
                ) : value.Claimed == "true" ? (
                  <Chip label={"Claimed"} />
                ) : (
                  <Chip label={"None"} />
                )}
              </TableCell>
              <TableCell>
                {value.Reserved == "" ? (
                  <Chip clickable color="secondary" label={"None"} />
                ) : value.Claimed == "true" ? (
                  <Chip label={"Reserved"} />
                ) : (
                  <Chip label={"None"} />
                )}
              </TableCell>

              <TableCell>
                <IconButton onClick={()=>deleteData(value)} color="error">
                  <Delete />
                </IconButton>

                <IconButton
                  title="View This House Details"
                  color="info"
                  onClick={() => {
                    navigate(`detail/${value.id}`);
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
  );
}
