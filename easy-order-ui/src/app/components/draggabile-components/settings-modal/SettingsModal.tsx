import {
  Col,
  Modal,
  QRCode,
  Radio,
  RadioChangeEvent,
  Row,
  Slider,
  Typography,
} from "antd";
import Table from "../table/Table";
import {
  updateTableChair,
  updateTableForm,
  updateTableSize,
} from "@/app/redux/features/table-slice";
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

  const onChangeChairs = (e: RadioChangeEvent) => {
    const changeChairs = e.target.value;
    dispatch(updateTableChair({ id, changeChairs }));
  };

  const onChangeForm = (e: RadioChangeEvent) => {
    const newForm = e.target.value;
    dispatch(updateTableForm({ id, newForm }));
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
        <Row gutter={16} style={{ marginBottom: "10px" }}>
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
        </Row>
        <Row gutter={16} style={{ marginBottom: "10px" }}>
          <Col>
            <Typography.Text>Broj stolica: </Typography.Text>
          </Col>
          <Col span={12}>
            <Radio.Group
              size="small"
              onChange={onChangeChairs}
              defaultValue={isTwoChairs}
            >
              <Radio.Button value={true}>Dvije Stolice</Radio.Button>
              <Radio.Button value={false}>Četiri stolice</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "15px" }}>
          <Col>
            <Typography.Text>Oblik stola: </Typography.Text>
          </Col>
          <Col span={12}>
            <Radio.Group
              size="small"
              onChange={onChangeForm}
              defaultValue={isSquare}
            >
              <Radio.Button value={true}>Okrugli</Radio.Button>
              <Radio.Button value={false}>Četvrtasti</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col>
            <QRCode value={`www.qrWithTableId/${id}` || "-"} />
          </Col>
        </Row>
      </Modal>
    </>
  );
}
