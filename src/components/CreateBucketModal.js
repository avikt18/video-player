import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { createBucketThunk } from "../redux/bucketSlice";

function CreateBucketModal({ isOpen, setIsOpen }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleError = (error) => {
    console.log(error);
    message.error("Error");
  };

  const handleCreate = (values) => {
    dispatch(createBucketThunk(values.bucketName));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Create Bucket"
      open={isOpen}
      onCancel={handleCancel}
      okText="Create"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(values);
            form.resetFields();
            handleCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="Create Bucket"
        onFinish={handleCreate}
        onFinishFailed={handleError}
      >
        <Form.Item
          name="bucketName"
          label="Bucket Name"
          rules={[
            {
              required: true,
              message: "Please input the name of Bucket!",
            },
          ]}
        >
          <Input placeholder="My Bucket" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateBucketModal;
