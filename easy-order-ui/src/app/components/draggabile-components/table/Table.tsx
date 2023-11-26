import { useRef } from "react";

interface Props {
  id?: string;
  isSquare?: boolean;
  size?: number & (1 | 2 | 3 | 4);
  isTwoChairs?: boolean;
  showId?: boolean;
  noChair?: boolean;
  modalMode?: boolean;
}

const sizeLookup = {
  1: "40",
  2: "50",
  3: "60",
  4: "70",
};

export default function Item({
  id,
  isSquare,
  size,
  isTwoChairs,
  showId,
  noChair,
  modalMode,
}: Props) {
  const draggableRef = useRef(null);

  const chairs = () => {
    if (isTwoChairs) return [90, 270];
    else return [0, 90, 180, 270];
  };

  return (
    <>
      <div
        ref={draggableRef}
        style={{
          position: modalMode ? "relative" : "absolute",
          width: modalMode ? "" : "90px",
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
                  }
            }
          ></div>
        ))}
      </div>
    </>
  );
}
