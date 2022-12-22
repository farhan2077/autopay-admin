import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { getTransactions } from "../../client/transactions.client";

export default function Transactions() {
  const [transactionsData, setTransactionsData] = useState([]);

  function fetchTransactions() {
    getTransactions()
      .then((res) => res.json())
      .then(({ data }) => {
        setTransactionsData(data);
      });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => {
        if (user) {
          return <span>{user.name}</span>;
        }
      },
    },
    {
      title: "Vehicle id",
      dataIndex: "user",
      key: "vehicleId",
      render: (user) => {
        if (user) {
          return <span>{user.vehicleId}</span>;
        }
      },
    },
    {
      title: "Transaction time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Payment status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => {
        if (paymentStatus === "paid") {
          return (
            <Tag icon={<CheckCircleOutlined />} color="#87d068">
              {paymentStatus}
            </Tag>
          );
        } else {
          return (
            <Tag icon={<CloseCircleOutlined />} color="#f50">
              {paymentStatus}
            </Tag>
          );
        }
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <p>Invite {record.name}</p>
    //       <p>Delete</p>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <div>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={transactionsData}
          bordered
        />
      </div>
    </>
  );
}
