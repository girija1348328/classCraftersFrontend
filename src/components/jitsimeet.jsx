// src/components/JitsiMeet.js
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJitsiToken } from "../store/slices/jitsiSlice";

const JitsiMeet = ({ room }) => {
  const dispatch = useDispatch();
  const { token, roomName, status, error } = useSelector((state) => state.jitsi);
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    // Fetch token when room changes
    if (room) {
      dispatch(fetchJitsiToken(room));
    }
  }, [room, dispatch]);

  useEffect(() => {
    if (status === "succeeded" && token && roomName) {
      const domain = "8x8.vc"; // JaaS domain
      const options = {
        roomName: roomName,
        jwt: token,
        parentNode: jitsiContainerRef.current,
      };

      apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

      return () => apiRef.current?.dispose();
    }
  }, [status, token, roomName]);

  if (status === "loading") return <p>Loading Jitsi...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return <div ref={jitsiContainerRef} style={{ width: "100%", height: "600px" }} />;
};

export default JitsiMeet;
