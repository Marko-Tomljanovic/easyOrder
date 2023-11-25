import { useRef, useState } from "react";
import Draggable from "react-draggable";
import SettingsModal from "../settings-modal/SettingsModal";

interface Props {
  id?: string;
  customBounds: object;
  position?: any;
  handleDrag: any;
  isSquare?: boolean;
  size?: number & (1 | 2 | 3 | 4);
  isTwoChairs?: boolean;
  showId?: boolean;
  noChair?: boolean;
  grid?: boolean;
}

const sizeLookup = {
  1: "40",
  2: "50",
  3: "60",
  4: "70",
};

export default function CircleTable({
  id,
  customBounds,
  position,
  handleDrag,
  isSquare,
  size,
  isTwoChairs,
  showId,
  noChair,
  grid,
}: Props) {
  const draggableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const chairs = () => {
    if (isTwoChairs) return [90, 270];
    else return [0, 90, 180, 270];
  };

  return (
    <>
      <Draggable
        bounds={customBounds}
        onStart={(e, ui) => {
          console.log("Drag started", e, ui);
        }}
        onDrag={(e, ui) => {
          handleDrag(e, ui, id);
          setIsDragging(true);
        }}
        onStop={(e, ui) => {
          console.log("Drag stoped", e, ui);
          if (!isDragging) {
            setIsModalOpen(true);
          }
          setIsDragging(false);
        }}
        grid={grid ? [25, 25] : [8, 8]}
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
                        13
                      }px)`,
                      width: "15px",
                      height: "15px",
                      border: "solid 1px",
                      // borderStyle: "double",
                    }
              }
            ></div>
          ))}
        </div>
      </Draggable>
      <SettingsModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        idStola={id}
      />
    </>
  );
}
