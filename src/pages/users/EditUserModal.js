import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

import { editUser } from "../../client/users.client";

export default function EditUserModal({
  open,
  onCreate,
  onCancel,
  currentUser,
}) {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [currentUser, form]);

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        editUser(values, currentUser.id)
          .then((res) => res.json())
          .then(({ success, message: msg }) => {
            if (success) {
              form.resetFields();
              onCreate(values);
              setConfirmLoading(false);
              message.success(msg);
            } else {
              setConfirmLoading(false);
              message.error(msg);
            }
          });
      })
      .catch((info) => {
        console.log("Validation failed", info);
        message.info(info);
      });
    setConfirmLoading(false);
  }

  return (
    <div>
      <Modal
        forceRender
        title="Edit user"
        okText="Save"
        cancelText="Cancel"
        open={open}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical" initialValues={currentUser}>
          <Form.Item
            name="vehicleType"
            label="Vehicle type&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter required field!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tollRate"
            label="Toll rate&nbsp;:"
            rules={[
              {
                required: true,
                message: "Please enter required field!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
