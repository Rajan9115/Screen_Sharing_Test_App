import { useState, useRef, useEffect } from "react";

export default function useScreenShare() {
  const [status, setStatus] = useState("idle");
  const [metadata, setMetadata] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null); 

  const startScreenShare = async () => {
    try {
      // Always cleanup before starting new
      stopScreenShare();

      setStatus("requesting");

      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      streamRef.current = mediaStream;

      const track = mediaStream.getVideoTracks()[0];
      setMetadata(track.getSettings());

      track.onended = () => {
        stopScreenShare();
      };

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      setStatus("granted");

    } catch (error) {
      if (error.name === "NotAllowedError") {
        setStatus("denied");
      } else if (error.name === "AbortError") {
        setStatus("cancelled");
      } else {
        setStatus("error");
      }
    }
  };

  const stopScreenShare = () => {
    const currentStream = streamRef.current;

    if (currentStream) {
      currentStream.getTracks().forEach((track) => {
        track.onended = null;
        track.stop();
      });
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    streamRef.current = null;
    setMetadata(null);
    setStatus("ended");
  };

  useEffect(() => {
    const currentStream = streamRef.current;

    if (!currentStream || !videoRef.current) return;

    videoRef.current.srcObject = currentStream;
    videoRef.current.play().catch(() => {});
  }, [status]);
  

  useEffect(() => {
    return () => {
      stopScreenShare();
      setStatus("idle");
    };
  }, []);

  return {
    status,
    metadata,
    videoRef,
    startScreenShare,
    stopScreenShare,
  };
}