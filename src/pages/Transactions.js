import { Space, Table, Tag } from "antd";

import styles from "./Transactions.module.css";

const columns = [
  {
    title: "User Id",
    dataIndex: "userId",
    key: "userId",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Vehicle",
    dataIndex: "vehicle",
    key: "vehicle",
  },
  {
    title: "Last payment status",
    dataIndex: "lastPayment",
    key: "lastPayment",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";

          if (tag === "loser") {
            color = "volcano";
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <p>Invite {record.name}</p>
        <p>Delete</p>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    userId: "039284023838403",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default function Transactions() {
  return (
    <>
      <div className={styles.tableSpacing}>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
}
