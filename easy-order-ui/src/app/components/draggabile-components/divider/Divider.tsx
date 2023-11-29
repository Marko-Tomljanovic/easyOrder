import { useRef } from "react";

export default function Divider() {
  const draggableRef = useRef(null);

  return (
    <>
      <div
        ref={draggableRef}
        style={{
          position: "absolute",
          height: "490px",
          width: "20px",
        }}
      >
        {/* Divider */}
        <div
          ref={draggableRef}
          style={{ borderLeft: "2px solid #000", height: "100%" }}
        ></div>
      </div>
    </>
  );
}
