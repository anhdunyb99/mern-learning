import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../contexts/SocketContexts";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

const Options = ({ children }) => {
  const [fullName, setFullName] = useState("");
  const [roomName, setRoomName] = useState("");
  const classes = useStyles();
  console.log("fullName", fullName);
  console.log("roomName", roomName);
  const handleOpenMeet = () => {
    window.open(
      `https://demo-meeting-app.herokuapp.com/lobby.html?name=${fullName}&room=${roomName}`,
      "_blank"
    );
  };
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Tên phòng
              </Typography>
              <TextField
                label="Tên phòng"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">
                Tên của bạn
              </Typography>
              <TextField
                label="Tên của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Phone fontSize="large" />}
                fullWidth
                onClick={() => handleOpenMeet()}
                className={classes.margin}
              >
                Tạo meeting
              </Button>
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
