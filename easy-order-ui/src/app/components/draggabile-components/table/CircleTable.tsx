import { useRef } from "react";
import Draggable from "react-draggable";

interface Props {
  id?: string;
  customBounds: object;
  handleDrag: any;
  isSquare?: boolean;
  size?: string & ("1" | "2" | "3");
  isTwoChairs?: boolean;
  showId?: boolean;
  noChair?: boolean;
  position?: any;
}

const sizeLookup = {
  "1": "50",
  "2": "60",
  "3": "70",
};

export default function CircleTable({
  id,
  customBounds,
  handleDrag,
  isSquare,
  size,
  isTwoChairs,
  showId,
  noChair,
  position,
}: Props) {
  const draggableRef = useRef(null);

  const chairs = () => {
    if (isTwoChairs) return [90, 270];
    else return [0, 90, 180, 270];
  };

  return (
    <Draggable
      bounds={customBounds}
      onStart={(e, ui) => console.log("Drag started", e, ui)}
      onDrag={(e, ui) => handleDrag(e, ui, id)}
      onStop={(e, ui) => console.log("Drag stopped", e, ui)}
      grid={[8, 8]}
      position={position}
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
        {/* Stol */}
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#001529",
          }}
        >
          {showId ? id : ""}
        </div>

        {/* Stolice */}
        {chairs().map((angle) => (
          <div
            ref={draggableRef}
            key={angle}
            style={
              noChair
                ? {}
                : {
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
                  }
            }
          ></div>
        ))}
      </div>
    </Draggable>
  );
}
