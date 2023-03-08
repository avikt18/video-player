import { Form, Input, message, Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createBucketThunk } from "../redux/bucketSlice";
import { createVideoThunk } from "../redux/videoSlice";

function CreateVideoModal({ isOpen, setIsOpen }) {
  const loading = useSelector((state) => state.videos.loading);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleCreate = (values) => {
    console.log(values);
    if (values.newBucketName) dispatch(createBucketThunk(values.newBucketName));
    try {
        dispatch(createVideoThunk({...values, bucketId: id}));
        message.success("Video Created");
    } catch (error) {
        message.error(error); 
    }
    setIsOpen(false);
  };

  const handleError = (error) => {
    console.log(error);
    message.error("Error");
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="New Video"
      open={isOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
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
        name="Create Video"
        onFinish={handleCreate}
        onFinishFailed={handleError}
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
      </Form>
    </Modal>
  );
}

export default CreateVideoModal;
