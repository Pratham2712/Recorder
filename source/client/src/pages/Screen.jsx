import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { checkUserLoginThunk } from "../redux/slices/UserInfoSlice";

const Screen = () => {
  const [recordingNumber, setRecordingNumber] = useState(0);
  const dispatch = useDispatch();
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );

  const {
    status,
    startRecording: startRecord,
    stopRecording: stopRecord,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true });

  const startRecording = () => {
    if (isLogin) {
      return startRecord();
    }
    {
      alert("please login");
    }
  };
  const stopRecording = () => {
    const currentTimeSatmp = new Date().getTime();
    setRecordingNumber(currentTimeSatmp);
    return stopRecord();
  };

  const viewRecording = () => {
    window.open(mediaBlobUrl, "_blank").focus();
  };

  useEffect(() => {
    dispatch(checkUserLoginThunk());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      {status && status !== "recording" && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => startRecording()}
        >
          start screen recording
        </Button>
      )}
      {status && status == "recording" && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => stopRecording()}
        >
          stop screen recording
        </Button>
      )}
      {mediaBlobUrl && status && status === "stopped" && (
        <Button
          variant="contained"
          color="success"
          sx={{
            marginLeft: "1.5rem",
          }}
          onClick={() => viewRecording()}
        >
          View
        </Button>
      )}
    </Box>
  );
};

export default Screen;
