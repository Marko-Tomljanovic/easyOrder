"use client";

import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { logIn } from "../redux/features/auth-slice";
import Draggable from "react-draggable";

export default function Page() {
  const draggableRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(logIn(e.target.value));
  };

  const handleDrag = (e: any, ui: any) => {
    // Handle drag logic here
  };

  const customBounds = {
    left: 0,
    top: 0,
    right: 380, // Adjust this value based on your requirements
    bottom: 380, // Adjust this value based on your requirements
  };

  return (
    <>
      <div
        style={{
          height: "500px",
          width: "500px",
          position: "relative",
          overflow: "auto",
          padding: "0",
          border: "solid 1px",
        }}
      >
        <div style={{ height: "490px", width: "490", padding: "10px" }}>
          <Draggable
            bounds={customBounds}
            onStart={(e, ui) => console.log("Drag started", e, ui)}
            onDrag={handleDrag}
            onStop={(e, ui) => console.log("Drag stopped", e, ui)}
            grid={[25, 25]}
            nodeRef={draggableRef}
          >
            <div
              ref={draggableRef}
              style={{ height: "100px", width: "100px", border: "solid" }}
            >
              prvi
              <br />
              <br />
              Bssssssss
            </div>
          </Draggable>
          <Draggable
            bounds={customBounds}
            onStart={(e, ui) => console.log("Drag started", e, ui)}
            onDrag={handleDrag}
            onStop={(e, ui) => console.log("Drag stopped", e, ui)}
            grid={[25, 25]}
            nodeRef={draggableRef}
          >
            <div
              ref={draggableRef}
              style={{ height: "100px", width: "100px", border: "solid" }}
            >
              drugi
              <br />
              <br />
              Bssssssss
            </div>
          </Draggable>
        </div>
      </div>
    </>
  );
}
