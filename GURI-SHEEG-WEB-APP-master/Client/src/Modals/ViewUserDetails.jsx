import React from 'react'
import * as mui from '@mui/material'
import { Close } from '@mui/icons-material'
export default function ViewUserDetails(props) {
  return (
    <>
      <mui.Dialog
        open={props.open}
        onClose={props.close}
        PaperProps={{
          style: {
            width: "400px",
            background: "#EDE4FF",
            borderRadius: 10,
          },
        }}
      >
        <mui.DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <mui.Typography sx={{ fontFamily: "poppins" }}>
            view user details
          </mui.Typography>
          <mui.IconButton onClick={props.close}>
            <Close />
          </mui.IconButton>
        </mui.DialogTitle>

        <mui.DialogContent>
          <img
            src={"http://localhost:8900/profiles/" + props.data.Profile}
            style={{ width: "100%", height: "250px", borderRadius: 10 }}
          />
          <mui.Box sx={{ mt: 2 }}>
            <mui.Typography>
              <strong>Fullname: </strong>
              {props.data.FullName}
            </mui.Typography>
            <mui.Divider sx={{ color: "#D7BBF5", my: 1 }} />
            <mui.Typography>
              <strong>Username: </strong> {props.data.Username}
            </mui.Typography>
            <mui.Divider sx={{ color: "#D7BBF5", my: 1 }} />
            <mui.Typography>
              <strong>Gender: </strong> {props.data.Gender}
            </mui.Typography>
            <mui.Divider sx={{ color: "#D7BBF5", my: 1 }} />
            <mui.Typography>
              <strong>Email: </strong> {props.data.Email}
            </mui.Typography>
            <mui.Divider sx={{ color: "#D7BBF5", my: 1 }} />
            <mui.Typography>
              <strong>Mobile: </strong>{" "}
              {props.data.Mobile == "" ? "N/A" : props.data.Mobile}
            </mui.Typography>
            <mui.Divider sx={{ color: "#D7BBF5", my: 1 }} />
            <mui.Typography>
              <strong>Region: </strong>{" "}
              {props.data.Region == "" ? "N/A" : props.data.Region}
            </mui.Typography>
            <mui.Divider sx={{ color: "#D7BBF5", my: 1 }} />
            <mui.Typography>
              <strong>Address: </strong>{" "}
              {props.data.Address == "" ? "N/A" : props.data.Address}
            </mui.Typography>
            <mui.Divider sx={{ color: "#D7BBF5", my: 1 }} />
            <mui.Typography>
              <strong>Type: </strong> {props.data.Type}
            </mui.Typography>
          </mui.Box>
        </mui.DialogContent>
      </mui.Dialog>
    </>
  );
}
