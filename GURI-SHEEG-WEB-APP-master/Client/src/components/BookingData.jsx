import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function BookingData() {
  const rowsData = [
    {
      id: 1,
      name: "Mohamed",
      age: 23,
    },
    {
      id: 2,
      name: "ali",
      age: 23,
    },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 350 },
    { field: "name", headerName: "Name", width: 350 },
    { field: "age", headerName: "age", width: 350 },
    {
      field: "button",
      headerName: "Button",
      width: 350,
      renderCell: (params) => {

        const handle=(e)=>{
            var row=params.row;
            alert(row.id);
        }
        return (<Button onClick={handle}>Click Me</Button>);
      },
    },
  ];

  const handleClick = (e) => {
    console.log(e);
  };
  return (
    <div>
      <DataGrid rows={rowsData} columns={columns} onRowClick={handleClick} />
    </div>
  );
}
