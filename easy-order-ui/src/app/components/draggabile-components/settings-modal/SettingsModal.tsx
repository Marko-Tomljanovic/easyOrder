import { Col, Modal, Row, Slider, Typography } from "antd";
import Table from "../table/Table";
import { updateTableSize } from "@/app/redux/features/table-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";

export default function SettingsModal({
  isModalOpen,
  setIsModalOpen,
  id,
  size,
  isSquare,
  isTwoChairs,
  showId,
  noChair,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
  id: any;
  size: any;
  isSquare: any;
  isTwoChairs: any;
  showId: any;
  noChair: any;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeSize = (newSize: number) => {
    dispatch(updateTableSize({ id, newSize }));
  };

  return (
    <>
      <Modal
        title={`Postavke stola ${id}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          id={id}
          isSquare={isSquare}
          size={size}
          isTwoChairs={isTwoChairs}
          showId={showId}
          noChair={noChair}
          modalMode
        />
        <br />
        <Row gutter={16}>
          <Col>
            <Typography.Text>Veličina: </Typography.Text>
          </Col>
          <Col span={12}>
            <Slider
              min={1}
              max={4}
              onChange={changeSize}
              value={typeof size === "number" ? size : 0}
            />
          </Col>
          {/* <Col span={4}>
            <InputNumber
              min={1}
              max={3}
              style={{ margin: "0 16px" }}
              value={inputValue}
            />
          </Col> */}
        </Row>
      </Modal>
    </>
  );
}
