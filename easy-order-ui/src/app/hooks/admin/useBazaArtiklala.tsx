import {
  deleteProduct,
  setNewProduct,
} from "@/app/redux/features/product-slice";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import { TargetKey } from "@/types/admin";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const initialItems = [
  {
    label: "Svi proizvodi",
    key: "",
    closable: false,
  },
];

const { confirm } = Modal;

export const useBazaArtikala = () => {
  const dispatch = useDispatch<AppDispatch>();
  const newTabIndex = useRef(0);
  const [items, setItems] = useState(initialItems);
  const [newLabel, setNewLabel] = useState<string>("");
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productList = useAppSelector((state) => {
    return state.productReducer;
  });

  const handleAddProduct = (id: string, title: string) => {
    const newProduct = {
      id: id,
      typeOfProduct: "",
      name: title,
      price: "",
    };
    dispatch(setNewProduct(newProduct));
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

  const onChange = (key: string) => {
    console.log(key);
    setActiveKey(key);
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
    dispatch(deleteProduct({ targetKey }));
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

  const checkGroup = (value: string) => {
    if (!activeKey) {
      return true;
    } else {
      return value === activeKey;
    }
  };

  return {
    productList,
    handleAddProduct,
    activeKey,
    items,
    onChange,
    onEdit,
    checkGroup,
    isModalOpen,
    handleOk,
    handleCancel,
    newLabel,
    handleChange,
  };
};
