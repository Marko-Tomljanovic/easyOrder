import { useRef, useState } from "react";
import Draggable from "react-draggable";
import SettingsModal from "../settings-modal/SettingsModal";
import Table from "./Table";

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

export default function DraggabileElement({
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
          <Table
            id={id}
            isSquare={isSquare}
            size={size}
            isTwoChairs={isTwoChairs}
            showId={showId}
            noChair={noChair}
          />
        </div>
      </Draggable>
      <SettingsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        id={id}
        size={size}
        isSquare={isSquare}
        isTwoChairs={isTwoChairs}
        showId={showId}
        noChair={noChair}
      />
    </>
  );
}
