import { useAdmin } from "@/context/AdminProvider";
import { Input, Modal } from "antd";

export default function ModalNazivGrupe() {
//   {
//   isModalOpen,
//   handleOk,
//   newLabel,
//   handleCancel,
//   handleChange,
// }: {
//   isModalOpen: any;
//   handleOk: any;
//   newLabel: any;
//   handleCancel: any;
//   handleChange: any;
// }
  const { isModalOpen, handleOk, newLabel, handleCancel, handleChange } =
    useAdmin();
  return (
    <>
      <Modal
        title={`Naziv grupe`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Unesite naziv kartice"
          type="string"
          value={newLabel}
          onChange={handleChange}
          onPressEnter={handleOk}
          maxLength={40}
          showCount
          allowClear
        />
      </Modal>
    </>
  );
}
