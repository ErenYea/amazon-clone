import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Notification.css";
import { Button } from "@mui/material";
import { useStateValue } from "./StateProvider";

export default function SimpleSlide({ data }) {
  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
      });
      setTimeout(() => {
        dispatch({
          type: "HIDE_NOTIFICATIONCOMPO",
        });
      }, 500);
    }, 2000);
  }, []);

  return (
    <Box sx={{ height: 180 }} className="main">
      {/* <Button onClick={handleChange}>CLick</Button> */}
      <Box sx={{ width: `calc(100px + 16px)` }}>
        <Slide
          direction="left"
          in={state.shownotification}
          mountOnEnter
          unmountOnExit
        >
          <Paper sx={{ m: 1 }} elevation={4}>
            <div className="slider">Product has been added</div>
          </Paper>
        </Slide>
      </Box>
    </Box>
  );
}
