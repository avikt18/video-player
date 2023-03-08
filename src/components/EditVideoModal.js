import { useState } from "react";
import { Modal, Form, Input, Select, message, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { editVideoThunk } from "../redux/videoSlice";
import { createBucketThunk } from "../redux/bucketSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
const { Option } = Select;

function EditVideoModal({ isOpen, setIsOpen, video }) {
  const bucketList = useSelector((state) => state.buckets.bucketList);
  const loading = useSelector((state) => state.videos.loading);
  const [newBucket, setNewBucket] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleEdit = (values) => {
    console.log(values);
    try {
      dispatch(editVideoThunk({ values, id: video.id }));
      message.success("Saved");
    } catch (error) {
      message.error(error);
    }
    setIsOpen(false);
  };

  const handleError = (error) => {
    console.log(error);
    message.error("Error");
  };

  return (
    <Modal
      title="Edit Video"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Save"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleEdit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="Create Video"
        onFinish={handleEdit}
        onFinishFailed={handleError}
        initialValues={video}
      >
        <Form.Item
          name="name"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of video!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="link"
          label="Link"
          rules={[
            {
              required: true,
              message: "Please input the URL of video!",
            },
          ]}
        >
          <Input placeholder="https://youtube.com/embed/" />
        </Form.Item>
        <Form.Item
          name="bucketId"
          label="Bucket Name"
          rules={[
            {
              required: true,
              message: "Please select bucket name",
            },
          ]}
        >
          <Select placeholder="Select a bucket">
            {bucketList?.map((bucket, id) => (
              <Option key={bucket.id || id} value={bucket?.id}>
                {bucket.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          name={newBucket ? "newBucketName" : "bucketId"}
          label="Bucket Name"
          rules={[
            {
              required: true,
              message: "Please select bucket name",
            },
          ]}
        >
          {newBucket ? (
            <Input placeholder="New Bucket" />
          ) : (
            <Select placeholder="Select a bucket">
              {bucketList?.map((bucket, id) => (
                <Option key={bucket.id || id} value={bucket?.id}>
                  {bucket.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        {!newBucket ? (
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            block
            onClick={() => setNewBucket(true)}
          >
            New Bucket
          </Button>
        ) : (
          <Button type="dashed" block onClick={() => setNewBucket(false)}>
            Select bucket
          </Button>
        )} */}
      </Form>
    </Modal>
  );
}

export default EditVideoModal;
