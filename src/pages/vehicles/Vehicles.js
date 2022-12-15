import React, { useEffect, useState } from "react";
import { Space, Table, Button, message, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import styles from "../pages.module.css";
import { getVehicles, deleteVehicle } from "../../client/vehicles.client";
import AddVehicleModal from "./AddVehicleModal";
import EditVehicleModal from "./EditVehicleModal";

export default function Vehicles() {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [editVehicleModalOpen, setEditAddVehicleModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  function fetchVehicles() {
    getVehicles()
      .then((res) => res.json())
      .then(({ data }) => {
        setVehiclesData(data);
      });
  }

  function onCreateAddVehicleModal() {
    fetchVehicles();
    setAddVehicleModalOpen(false);
  }

  function onCreateEditVehicleModal(record) {
    fetchVehicles();
    setEditAddVehicleModalOpen(false);
    setSelectedVehicle(record);
  }

  function handleDelete(vehicleId) {
    deleteVehicle(vehicleId)
      .then((res) => res.json())
      .then(({ success, message: msg, error: err }) => {
        if (success) {
          message.success(msg);
        } else {
          message.error(err);
        }
      })
      .then(() => fetchVehicles());
  }

  const copySuccessfulMessage = () => {
    message.success("Vehicle Id has been copied to the clipboard", 2);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const columns = [
    {
      title: "Id (Click to copy Id)",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (id) => (
        <Tooltip title="Click to copy vehicle Id">
          <span
            onClick={() => {
              navigator.clipboard.writeText(id).then(copySuccessfulMessage());
            }}
          >
            {id}
          </span>
        </Tooltip>
      ),
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
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              onCreateEditVehicleModal(record);
              setEditAddVehicleModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => {
              handleDelete(record.id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className={styles.buttonBottomSpace}
        onClick={() => {
          setAddVehicleModalOpen(true);
        }}
      >
        Add new vehicle
      </Button>

      <AddVehicleModal
        open={addVehicleModalOpen}
        onCreate={onCreateAddVehicleModal}
        onCancel={() => {
          setAddVehicleModalOpen(false);
        }}
      />

      <EditVehicleModal
        open={editVehicleModalOpen}
        onCreate={onCreateEditVehicleModal}
        currentVehicle={selectedVehicle}
        onCancel={() => {
          setEditAddVehicleModalOpen(false);
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
