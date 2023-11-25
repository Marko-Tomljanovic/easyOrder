import { Modal } from "antd";

export default function SettingsModal({
  isModalOpen,
  setIsModalOpen,
  idStola,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
  idStola: any;
}) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Postavke stola"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>id stola: {idStola}</p>
      </Modal>
    </>
  );
}
