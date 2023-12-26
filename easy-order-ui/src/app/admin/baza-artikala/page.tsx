"use client";

import ItemCard from "@/app/components/item-card/ItemCard";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Col, Input, Modal, Row, Tabs, message } from "antd";
import { useRef, useState } from "react";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  {
    label: "Svi proizvodi",
    key: "",
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
  const [marko, setMarko] = useState<any>([
    { id: "1", grupa: "", ime: "Kava s mlijekom", cijena: "2" },
    { id: "2", grupa: "", ime: "Espresso", cijena: "1" },
    { id: "3", grupa: "2", ime: "Coca-Cola", cijena: "1" },
    { id: "4", grupa: "0", ime: "Fanta", cijena: "2" },
    { id: "5", grupa: "0", ime: "Sprite", cijena: "1.5" },
    { id: "6", grupa: "", ime: "Capuccino", cijena: "3" },
    { id: "7", grupa: "", ime: "Produžena kava", cijena: "2" },
  ]);

  const onChange = (key: string) => {
    console.log(key);
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: newLabel,
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
    //brisanje grupe iz liste proizvoda, dodati type kasnije
    const updatedMarko = marko.map((item: any) => ({
      ...item,
      grupa: item.grupa === targetKey ? "" : item.grupa,
    }));
    setMarko(updatedMarko);
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
    setNewLabel("");
  };

  const handleChange = (e: any) => {
    const { value } = e.target;

    const copyValue = /^\p{Lu}/u.test(value)
      ? value
      : value.charAt(0).toUpperCase() + value.slice(1);

    setNewLabel(copyValue);
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

  const checkGroup = (value: string) => {
    if (!activeKey) {
      return true;
    } else {
      return value === activeKey;
    }
  };

  return (
    <>
      <Tabs
        defaultActiveKey="0"
        activeKey={activeKey}
        items={items}
        onChange={onChange}
        type="editable-card"
        onEdit={onEdit}
      />

      <Row gutter={[8, 16]}>
        {marko.map(
          (item: any) =>
            checkGroup(item.grupa) && (
              <Col key={item.id}>
                <ItemCard key={item.id} title={item.ime} price={item.cijena} />
              </Col>
            )
        )}
      </Row>

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
