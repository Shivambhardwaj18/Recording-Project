import React from "react";
import { AppBar, Avatar, Toolbar, Typography } from "@material-ui/core";

export default function Header() {
  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: "#262B40", borderRadius: "10px" }}
        elevation={2}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            Manage Call Recording
          </Typography>
          <Avatar
            alt="Profile Photo"
            src={`https://image.shutterstock.com/z/stock-vector-businessman-avatar-profile-picture-221565274.jpg`}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
