import { useRef, useState } from "react";
import Draggable from "react-draggable";

interface Props {
  customBounds: object;
  //   handleDrag: (e: any, ui: any, s: string) => any;
  isSquare?: boolean;
  size?: string & ("1" | "2" | "3");
  isTwoChairs?: boolean;
}

const sizeLookup = {
  "1": "50",
  "2": "60",
  "3": "70",
};

export default function CircleTable({
  customBounds,
  //   handleDrag,
  isSquare,
  size,
  isTwoChairs,
}: Props) {
  const draggableRef = useRef(null);
  const [positions, setPositions] = useState({});

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

  const chairs = () => {
    if (isTwoChairs) return [90, 270];
    else return [0, 90, 180, 270];
  };

  return (
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
            width: size
              ? sizeLookup[size as keyof typeof sizeLookup] + "px"
              : "40px",
            height: size
              ? sizeLookup[size as keyof typeof sizeLookup] + "px"
              : "40px",
            borderRadius: isSquare ? "0%" : "50%",
            backgroundColor: "#E6F7FF",
            border: "solid 1.5px",
            borderColor: "#69C0FF",
          }}
        ></div>

        {/* Squares */}
        {chairs().map((angle) => (
          <div
            ref={draggableRef}
            key={angle}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${
                (size
                  ? Number(sizeLookup[size as keyof typeof sizeLookup])
                  : 40) /
                  2 +
                15
              }px)`,
              width: "18px",
              height: "18px",
              border: "solid 1px",
            }}
          ></div>
        ))}
      </div>
    </Draggable>
  );
}
