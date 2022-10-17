import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";

import { getVehicles, createVehicle } from "../client/vehicles.client";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Vehicle Type",
    dataIndex: "vehicleType",
    key: "vehicleType",
  },
  {
    title: "Toll Rate (৳)",
    dataIndex: "tollRate",
    key: "tollRate",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function Vehicles() {
  const [vehiclesData, setVehiclesData] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      getVehicles()
        .then((res) => res.json())
        .then(({ data }) => {
          setVehiclesData(data);
        });
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={vehiclesData}
      />
    </div>
  );
}
