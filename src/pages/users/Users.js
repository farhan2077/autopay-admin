import React, { useEffect, useState } from "react";
import { Space, Table, Button, message, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import pageStyle from "../pages.module.css";
import { getUsers, deleteUser } from "../../client/users.client";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [selectedUser, setSelecteduser] = useState(null);

  function fetchUsers() {
    getUsers()
      .then((res) => res.json())
      .then(({ data }) => {
        setUsersData(data);
      });
  }

  function onCreateAddUserModal() {
    fetchUsers();
    setAddUserModalOpen(false);
  }

  function onCreateEditUserModal(record) {
    fetchUsers();
    setEditUserModalOpen(false);
    setSelecteduser(record);
  }

  function handleDelete(vehicleId) {
    deleteUser(vehicleId)
      .then((res) => res.json())
      .then(({ success, message: msg }) => {
        if (success) {
          message.success(msg);
        } else {
          message.error(msg);
        }
      })
      .then(() => fetchUsers());
  }

  const copySuccessfulMessage = () => {
    message.success("Id has been copied to the clipboard", 2);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Id (Click to copy Id)",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (id) => (
        <Tooltip title="Click to copy Id">
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      ellipsis: true,
    },
    {
      title: "Vehicle Id",
      dataIndex: "vehicleId",
      key: "vehicleId",
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
              onCreateEditUserModal(record);
              setEditUserModalOpen(true);
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
        className={pageStyle.buttonBottomSpace}
        onClick={() => {
          setAddUserModalOpen(true);
        }}
      >
        Add new vehicle
      </Button>

      <AddUserModal
        open={addUserModalOpen}
        onCreate={onCreateAddUserModal}
        onCancel={() => {
          setAddUserModalOpen(false);
        }}
      />

      <EditUserModal
        open={editUserModalOpen}
        onCreate={onCreateEditUserModal}
        currentUser={selectedUser}
        onCancel={() => {
          setEditUserModalOpen(false);
        }}
      />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={usersData}
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
