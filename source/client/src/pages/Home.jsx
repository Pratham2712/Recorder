import React, { useEffect } from "react";
import Webcam from "react-webcam";
import { useState, useRef, useCallback } from "react";
import { Box, Button, Dialog } from "@mui/material";

const Home = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState({});
  const [videoBlob, setVideoBlob] = useState(null);
  const [play, setPlay] = useState(false);

  const handleClose = () => {
    setPlay(false);
  };

  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
  };

  const handleStartCaptureClick = React.useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    webcamRef.current.stream = stream;
    if (webcamRef.current.stream) {
      setCapturing(true);
      localStorage.clear();

      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    } else {
      alert("camera permission denied");
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const base64String = event.target.result;
          localStorage.setItem("video", base64String);
        };
        reader.readAsDataURL(data);
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const convert = () => {
    setPlay(true);
    const dataURL = localStorage.getItem("video");
    if (dataURL) {
      const base64String = dataURL.split(",")[1];
      const byteCharacters = atob(base64String);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([new Uint8Array(byteArrays)], {
        type: "video/webm",
      });

      setVideoBlob(blob);
    }
  };

  return (
    <div className="container">
      <Webcam
        audio={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <Box
        sx={{
          display: "flex",
          marginTop: "2rem",
        }}
      >
        {capturing ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleStopCaptureClick}
          >
            Stop Capture
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleStartCaptureClick}>
            Start Capture
          </Button>
        )}

        <Button
          variant="contained"
          onClick={() => {
            convert();
          }}
          sx={{ marginLeft: "1.5rem" }}
        >
          play
        </Button>
      </Box>
      <div>
        {/* {videoBlob && (
          <video controls>
            <source
              src={window.URL.createObjectURL(videoBlob)}
              type={videoBlob.type}
            />
            Your browser does not support the video tag.
          </video>
        )} */}
      </div>
      <Dialog
        open={play}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {videoBlob && (
          <video controls>
            <source
              src={window.URL.createObjectURL(videoBlob)}
              type={videoBlob.type}
            />
            Your browser does not support the video tag.
          </video>
        )}
      </Dialog>
    </div>
  );
};

export default Home;
