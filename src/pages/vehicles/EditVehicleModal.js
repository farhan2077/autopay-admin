import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from "antd";

import { editVehicle } from "../../client/vehicles.client";

export default function EditVehicleModal({
  open,
  onCreate,
  onCancel,
  currentVehicle,
}) {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [currentVehicle, form]);

  function handleOk() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        editVehicle(values, currentVehicle.id)
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
        title="Edit vehicle"
        okText="Save"
        cancelText="Cancel"
        open={open}
        onCancel={onCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical" initialValues={currentVehicle}>
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
