import React from "react";
import Card from "../../../components/usage/Card";
import Wrapper from "../../../components/usage/Wrapper";
import { Typography, Box, Chip, Divider, Skeleton } from "@mui/material";
import { PinDrop } from "@mui/icons-material";
export default function DetailContent({ land, images }) {
  return (
    <Wrapper
      styles={{ mt: 7,p: 5, borderRadius: 5, display: "flex", justifyContent: "center", gap: 2 }}
    >
      <Card
        styles={{
          width: "510px",
          borderRadius: 5,
          p: 1,
          mb: 2,
        }}
      >
        {images ? (
          <img
            src={`http://localhost:8900/landImages/${images.images[0].image}`}
            style={{ width: "100%", height: "200px", borderRadius: 7 }}
          />
        ) : (
          <Skeleton variant="rounded" width={"100%"} height={"200px"} />
        )}

        <Box sx={{ p: 2 }}>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 20,
              fontFamily: "poppins",
              fontWeight: "bold",
            }}
          >
            {land ? land.land[0].Dagmada : <Skeleton width={"180px"} />}
            {land ? (
              <PinDrop />
            ) : (
              <Skeleton variant="circular" width={"30px"}  height={"30px"}/>
            )}
          </Typography>
          <Typography sx={{ fontSize: 15 }}>
            {" "}
            {land ? land.land[0].Street_address : <Skeleton width={"100px"} />}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            {land ? (
              <Typography sx={{ fontSize: 15 }}>
                Size: <strong> {land.land[0].Size} </strong>
              </Typography>
            ) : (
              <Skeleton width={"100px"} />
            )}
            {land ? (
              <Typography sx={{ fontSize: 15 }}>
                Lacagta: <strong> $ {land.land[0].Lacagta}</strong>
              </Typography>
            ) : (
              <Skeleton width={"100px"} />
            )}
          </Box>
          <Box
            sx={{
              mt: 2,
            }}
          >
            <table border={1} style={{ width: "100%", padding: 5 }}>
              <tr style={{ background: "red", color: "white" }}>
                <th>{land ? "Waqooy" : <Skeleton />}</th>
                <th>{land ? "Koonfur" : <Skeleton />}</th>
                <th>{land ? "Galbeed" : <Skeleton />}</th>
                <th>{land ? "Bari" : <Skeleton />}</th>
              </tr>
              <tr style={{ border: "none", padding: 2 }}>
                <td> {land ? land.land[0].Waqooy : <Skeleton />}</td>
                <td> {land ? land.land[0].Konfur : <Skeleton />}</td>
                <td> {land ? land.land[0].Galbeed : <Skeleton />}</td>
                <td> {land ? land.land[0].Bari : <Skeleton />}</td>
              </tr>
            </table>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Chip
              color="primary"
              label={
                land
                  ? land.land[0].Reserved == ""
                    ? "Reserved: None"
                    : land.land[0].Reserved == "Reserved: Yes"
                    ? "Reserved"
                    : "Reserved: None"
                  : "Loading..."
              }
            />

            <Chip
              color="secondary"
              label={
                land
                  ? land.land[0].Claimed == ""
                    ? "Claimed: None"
                    : land.land[0].Claimed == "Reserved: Yes"
                    ? "Claimed"
                    : "Claimed: None"
                  : "Loading...."
              }
            />
          </Box>

          {land ? (
            <Typography sx={{ fontSize: 15, mt: 2 }}>
              Created At: <strong>{land.land[0].DateCreated}</strong>
            </Typography>
          ) : (
            <Skeleton />
          )}
          <Divider />
        </Box>
      </Card>

      <Card
        styles={{
          width: "510px",
          borderRadius: 5,
          p: 1,
          mb: 2,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Divider />
          <Typography
            sx={{
              fontSize: 17,
              fontFamily: "poppins",
              fontWeight: "bold",
              mt: 2,
            }}
          >
            {land ? " Other Description" : <Skeleton />}
          </Typography>
          <Typography sx={{ fontSize: 15, mt: 2 }}>
            {land ? (
              land.land[0].Description
            ) : (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
          </Typography>
        </Box>
      </Card>
    </Wrapper>
  );
}
