import {
  Button,
  Col,
  InputNumber,
  Modal,
  Popconfirm,
  QRCode,
  Radio,
  RadioChangeEvent,
  Row,
  Slider,
  Typography,
} from "antd";
import Table from "../table/Table";
import {
  deleteTable,
  updateTableProps,
} from "@/app/redux/features/table-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { useEffect, useState } from "react";

type TableType = {
  newId: string;
  newSize: number & (1 | 2 | 3 | 4);
  newForm: boolean;
  changeChairs: boolean;
};

export default function SettingsModal({
  isModalOpen,
  setIsModalOpen,
  id,
  size,
  isSquare,
  isTwoChairs,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
  id: any;
  size: number & (1 | 2 | 3 | 4);
  isSquare: any;
  isTwoChairs: any;
}) {
  const [tempTableData, setTempTableData] = useState<TableType>({
    newId: id,
    newSize: size,
    changeChairs: isTwoChairs,
    newForm: isSquare,
  });

  useEffect(() => {
    console.log("tempTableData", tempTableData);
  }, [tempTableData]);
  const dispatch = useDispatch<AppDispatch>();
  const handleOk = () => {
    const { newId, newSize, changeChairs, newForm } = tempTableData;

    dispatch(updateTableProps({ id, newId, newSize, changeChairs, newForm }));

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeSize = (value: number) => {
    setTempTableData((prevState: any) => ({
      ...prevState,
      newSize: value,
    }));
  };

  const onChangeChairs = (e: RadioChangeEvent) => {
    const changeChairs = e.target.value;
    setTempTableData((prevState: any) => ({
      ...prevState,
      changeChairs: changeChairs,
    }));
  };

  const onChangeForm = (e: RadioChangeEvent) => {
    const newForm = e.target.value;
    setTempTableData((prevState: any) => ({
      ...prevState,
      newForm: newForm,
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTable({ id }));
  };

  const handleChangeId = (value: string | null) => {
    setTempTableData((prevState: any) => ({
      ...prevState,
      newId: value,
    }));
  };

  return (
    <>
      <Modal
        title={`Postavke stola ${id}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            title="Obrisati stol"
            description="Jeste li sigurni da želite obrisati odabrani stol?"
            onConfirm={handleDelete}
            // onCancel={cancel}
            okText="Da"
            cancelText="Ne"
          >
            <Button danger>Obrisati stol</Button>
          </Popconfirm>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Potvrdi
          </Button>,
        ]}
      >
        <Table
          id={tempTableData.newId}
          isSquare={tempTableData.newForm}
          size={tempTableData.newSize}
          isTwoChairs={tempTableData.changeChairs}
          showId={true}
          noChair={false}
          modalMode
        />
        <br />
        <Row gutter={16} align={"middle"} style={{ marginBottom: "10px" }}>
          <Col>
            <Typography.Text>Promjena id: </Typography.Text>
          </Col>
          <Col span={5}>
            <InputNumber
              width={"100%"}
              stringMode
              bordered={false}
              min={"1"}
              max={"50"}
              onChange={handleChangeId}
              value={tempTableData.newId}
            />
          </Col>
        </Row>
        <Row gutter={16} align={"middle"} style={{ marginBottom: "10px" }}>
          <Col>
            <Typography.Text>Veličina: </Typography.Text>
          </Col>
          <Col span={12}>
            <Slider
              min={1}
              max={4}
              onChange={changeSize}
              value={typeof size === "number" ? tempTableData.newSize : 0}
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
              defaultValue={tempTableData.changeChairs}
            >
              <Radio.Button value={true}>Dvije Stolice</Radio.Button>
              <Radio.Button value={false}>Četiri stolice</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "10px" }}>
          <Col>
            <Typography.Text>Oblik stola: </Typography.Text>
          </Col>
          <Col span={12}>
            <Radio.Group
              size="small"
              onChange={onChangeForm}
              defaultValue={tempTableData.newForm}
            >
              <Radio.Button value={false}>Okrugli</Radio.Button>
              <Radio.Button value={true}>Četvrtasti</Radio.Button>
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
