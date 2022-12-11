import React, { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import styles from "../pages.module.css";
import { getVehicles } from "../../client/vehicles.client";
import AddVehicleModal from "./AddVehicleModal";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    ellipsis: true,
  },
  {
    title: "Vehicle Type",
    dataIndex: "vehicleType",
    key: "vehicleType",
    ellipsis: true,
  },
  {
    title: "Toll Rate (BDT)",
    dataIndex: "tollRate",
    key: "tollRate",
    ellipsis: true,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined />}>Edit</Button>
        <Button icon={<DeleteOutlined />} type="primary" danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

export default function Vehicles() {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  function fetchVehicles() {
    getVehicles()
      .then((res) => res.json())
      .then(({ data }) => {
        setVehiclesData(data);
      });
  }

  function onCreate(values) {
    setModalOpen(false);
    fetchVehicles();
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className={styles.buttonBottomSpace}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add new vehicle
      </Button>

      <AddVehicleModal
        open={modalOpen}
        onCreate={onCreate}
        onCancel={() => {
          setModalOpen(false);
        }}
      />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={vehiclesData}
        size="middle"
        bordered
        pagination={{
          position: ["bottomCenter"],
          defaultCurrent: 1,
          showTotal: (total, range) => {
            return `${range[0]} to ${range[1]} of ${total} vehicles`;
          },
        }}
      />
    </div>
  );
}
