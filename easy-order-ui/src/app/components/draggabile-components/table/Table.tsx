import { Typography } from "antd";
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
  1: { tableSize: "40", fontSize: "14", fontWeight: "400" },
  2: { tableSize: "50", fontSize: "18", fontWeight: "350" },
  3: { tableSize: "60", fontSize: "20", fontWeight: "350" },
  4: { tableSize: "70", fontSize: "22", fontWeight: "350" },
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
              ? sizeLookup[size as keyof typeof sizeLookup].tableSize + "px"
              : "40px",
            height: size
              ? sizeLookup[size as keyof typeof sizeLookup].tableSize + "px"
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
          <Typography.Text
            style={{
              fontWeight:
                sizeLookup[size as keyof typeof sizeLookup].fontWeight,
              fontSize:
                sizeLookup[size as keyof typeof sizeLookup].fontSize + "px",
            }}
          >
            {showId ? id : ""}
          </Typography.Text>
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
                        ? Number(
                            sizeLookup[size as keyof typeof sizeLookup]
                              .tableSize
                          )
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
