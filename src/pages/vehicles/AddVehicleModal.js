import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";

import { addVechicle } from "../../client/vehicles.client";

export default function AddVehicleModal({ open, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        addVechicle(values)
          .then((res) => res.json())
          .then(({ success, message: msg, error: err }) => {
            if (success) {
              form.resetFields();
              onCreate(values);
              setConfirmLoading(false);
              message.success(msg);
            } else {
              setConfirmLoading(false);
              message.error(err);
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
        title="Add vehicle"
        okText="Add vehicle"
        cancelText="Cancel"
        open={open}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical">
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
