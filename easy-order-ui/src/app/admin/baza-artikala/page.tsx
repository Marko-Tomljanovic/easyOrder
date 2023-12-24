"use client";

import ItemCard from "@/app/components/item-card/ItemCard";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Input, Modal, Popconfirm, Tabs, message } from "antd";
import { useRef, useState } from "react";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  {
    label: "Svi proizvodi",
    children: "Content of Tab 3",
    key: "3",
    closable: false,
  },
];

const { confirm } = Modal;

export default function Page() {
  const [items, setItems] = useState(initialItems);
  const [newLabel, setNewLabel] = useState<string>("");
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const newTabIndex = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (key: string) => {
    console.log(key);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: newLabel,
      children: "Content of new Tab",
      key: newActiveKey,
      closable: true,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: "add" | "remove"
  ) => {
    if (action === "add") {
      showModal();
    } else {
      showDeleteConfirm(targetKey);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const validateModalInput = () => {
    if (newLabel.length < 2) {
      return true;
    }
    return false;
  };

  const handleOk = () => {
    const hasError = validateModalInput();
    if (hasError) {
      message.warning("Pogrešan unos, potrbeno je minimalno dva slova.", 4);
      return;
    }
    add();
    setIsModalOpen(false);
    setNewLabel("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    console.log("value", value);
    setNewLabel(value);
  };

  const showDeleteConfirm = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string
  ) => {
    confirm({
      title: "Jeste li sigurni da želite obisati grupu?",
      icon: <ExclamationCircleFilled />,
      content: "Svi proizvodi iz grupe neće imati definaranu grupu.",
      okText: "Da",
      okType: "danger",
      cancelText: "Ne",
      onOk() {
        remove(targetKey);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={() => onChange}
        type="editable-card"
        onEdit={onEdit}
      />
      <div style={{ width: "10rem" }}></div>
      <ItemCard />
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
