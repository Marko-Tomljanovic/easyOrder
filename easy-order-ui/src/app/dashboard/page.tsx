"use client";

import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { logIn } from "../redux/features/auth-slice";
import Draggable from "react-draggable";

export default function Page() {
  const draggableRef = useRef(null);
  const [positions, setPositions] = useState({});
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(logIn(e.target.value));
  };

  const handleDrag = (e: any, ui: any, id: string) => {
    const newPosition = {
      x: ui.x,
      y: ui.y,
    };

    setPositions((prevPositions) => ({
      ...prevPositions,
      [id]: newPosition,
    }));
  };

  const customBounds = {
    left: 0,
    top: 0,
    right: 705, // Adjust this value based on your requirements
    bottom: 405, // Adjust this value based on your requirements
  };

  return (
    <>
      <div
        style={{
          height: "500px",
          width: "800px",
          position: "relative",
          overflow: "auto",
          padding: "0",
          border: "solid 1px",
        }}
      >
        <Draggable
          bounds={customBounds}
          onStart={(e, ui) => console.log("Drag started", e, ui)}
          onDrag={(e, ui) => handleDrag(e, ui, "prvi")}
          onStop={(e, ui) => console.log("Drag stopped", e, ui)}
          grid={[8, 8]}
          nodeRef={draggableRef}
        >
          <div
            ref={draggableRef}
            style={{
              position: "absolute",
              width: "90px",
              height: "90px",
            }}
          >
            {/* Circle */}
            <div
              ref={draggableRef}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#E6F7FF",
                border: "solid 1.5px",
                borderColor: "#69C0FF",
              }}
            ></div>

            {/* Squares */}
            {[0, 90, 180, 270].map((angle) => (
              <div
                key={angle}
                ref={draggableRef}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${
                    40 / 2 + 15
                  }px)`,
                  width: "20px",
                  height: "20px",
                  // backgroundColor: "grey",
                  border: "solid 1px",
                }}
              ></div>
            ))}
          </div>
        </Draggable>
        <Draggable
          bounds={customBounds}
          onStart={(e, ui) => console.log("Drag started", e, ui)}
          onDrag={(e, ui) => handleDrag(e, ui, "prvi")}
          onStop={(e, ui) => console.log("Drag stopped", e, ui)}
          grid={[8, 8]}
          nodeRef={draggableRef}
        >
          <div
            ref={draggableRef}
            style={{
              position: "absolute",
              width: "90px",
              height: "90px",
            }}
          >
            {/* Circle */}
            <div
              ref={draggableRef}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#E6F7FF",
                border: "solid 1.5px",
                borderColor: "#69C0FF",
              }}
            ></div>

            {/* Squares */}
            {[0, 90, 180, 270].map((angle) => (
              <div
                key={angle}
                ref={draggableRef}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${
                    40 / 2 + 15
                  }px)`,
                  width: "20px",
                  height: "20px",
                  // backgroundColor: "grey",
                  border: "solid 1px",
                }}
              ></div>
            ))}
          </div>
        </Draggable>

        {/* <Draggable
            bounds={customBounds}
            onStart={(e, ui) => console.log("Drag started", e, ui)}
            onDrag={(e, ui) => handleDrag(e, ui, "drugi")}
            onStop={(e, ui) => console.log("Drag stopped", e, ui)}
            grid={[10, 10]}
            nodeRef={draggableRef}
          >
            <div
              ref={draggableRef}
              style={{
                height: "20px",
                width: "20px",
                border: "solid",
                position: "absolute",
              }}
            >
              4
            </div>
          </Draggable> */}
      </div>
    </>
  );
}
