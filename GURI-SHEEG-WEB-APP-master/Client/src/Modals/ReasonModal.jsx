import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
} from "@mui/material";
import React, { useState } from "react";

export default function ReasonModal(props) {
  const { open, close, handleClick } = props;
  const [data,setData]=useState({
    reason: ""
  })
  return (
    <Dialog
      onClose={close}
      open={open}
      PaperProps={{
        style: {
          width: "400px",
          borderRadius: "6px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Release Bookings</Typography>

        <IconButton color="error" onClick={close}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ fontFamily: "poppins" }}>
          Fadlan Inoo Sheeg Waxa Aad Ugu Tagayso?
        </Typography>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={data.reason}
          name="radio-buttons-group"
          onChange={(e) =>
            setData({
              reason: e.target.value,
            })
          }
        >
          <Paper
            sx={{ p: 1, my: 2, display: "flex", alignItems: "center" }}
            elevation={1}
          >
            <FormControlLabel
              value="Guri Kale Ayaan Helay"
              control={<Radio />}
              label="Guri Kale Ayaan Helay"
            />
          </Paper>
          <Paper
            sx={{ p: 1, my: 2, display: "flex", alignItems: "center" }}
            elevation={1}
          >
            <FormControlLabel
              value="Lacagta Ayaa Qaali Ah"
              control={<Radio />}
              label="Lacagta Ayaa Qaali Ah"
            />
          </Paper>
          <Paper
            sx={{ p: 1, my: 2, display: "flex", alignItems: "center" }}
            elevation={1}
          >
            <FormControlLabel
              value="Wuu Igu Dheeraday"
              control={<Radio />}
              label="Wuu Igu Dheeraday"
            />
          </Paper>
          <Paper
            sx={{ p: 1, my: 2, display: "flex", alignItems: "center" }}
            elevation={1}
          >
            <FormControlLabel
              value="Guriga Ima Anficin Oo Waan ka Laabtay"
              control={<Radio />}
              label="Guriga Ima Anficin Oo Waan ka Laabtay"
            />
          </Paper>
        </RadioGroup>

        <Button
          onClick={() => {
            handleClick(data.reason);
            setData({
                reason: ""
            })
          }}
          color="error"
          variant="outlined"
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
