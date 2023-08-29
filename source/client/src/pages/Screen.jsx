import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const Screen = () => {
  const [recordingNumber, setRecordingNumber] = useState(0);

  const {
    status,
    startRecording: startRecord,
    stopRecording: stopRecord,
    mediaBlobUrl,
  } = useReactMediaRecorder({ screen: true });

  const startRecording = () => {
    return startRecord();
  };
  const stopRecording = () => {
    const currentTimeSatmp = new Date().getTime();
    setRecordingNumber(currentTimeSatmp);
    return stopRecord();
  };

  const viewRecording = () => {
    window.open(mediaBlobUrl, "_blank").focus();
  };

  return (
    <div>
      {status && status !== "recording" && (
        <button onClick={() => startRecording()}>start screen recording</button>
      )}
      {status && status == "recording" && (
        <button onClick={() => stopRecording()}>start screen recording</button>
      )}
      {mediaBlobUrl && status && status === "stopped" && (
        <button onClick={() => viewRecording()}>View</button>
      )}
    </div>
  );
};

export default Screen;
