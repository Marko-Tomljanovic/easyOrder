import { useRef, useState } from "react";
import Draggable from "react-draggable";
import Divider from "./Divider";

interface Props {
  id?: string;
  customBounds: object;
  position?: any;
  handleDrag: any;
}

export default function DraggabileElement({
  id,
  customBounds,
  position,
  handleDrag,
}: Props) {
  const draggableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

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
        position={position}
        axis="x"
        nodeRef={draggableRef}
      >
        <div
          ref={draggableRef}
          style={{
            position: "absolute",
          }}
        >
          <Divider />
        </div>
      </Draggable>
    </>
  );
}
