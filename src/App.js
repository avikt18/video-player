import { HistoryOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Layout, message, Select, Typography } from 'antd';
import 'antd/dist/antd.min.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CardList from "./components/CardList";
import CreateVideoModal from "./components/CreateVideoModal";
import { fetchBucketsThunk, setActiveBucketId, setBucketNameThunk } from "./redux/bucketSlice";
import { deleteVideosThunk, fetchVideosThunk, removeSelectedVideos } from "./redux/videoSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./styles.css";
import History from "./components/History";
const { Header, Content, Footer } = Layout
const { Option } = Select
const { Title } = Typography;

export default function App() {
  const dispatch = useDispatch()
  const bucketList = useSelector(state => state.buckets.bucketList)
  const activeBucketId = useSelector(state => state.buckets.activeBucketId)
  const loading = useSelector(state => state.videos.loading)
  const selectedVideos = useSelector(state => state.videos.selectedVideos)
  const [bucketName, setBucketName] = useState("All")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = (value) => {
    dispatch(setActiveBucketId(value))
    if (value)
      setBucketName(bucketList?.find((list) => list.id === value).name)
    else
      setBucketName("All")
  }

  const deleteVideo = () => {
    message.info(`${selectedVideos.length} Video(s) Deleted`)
    dispatch(deleteVideosThunk())
  }

  const cancelDelete = () => {
    dispatch(removeSelectedVideos())
  }

  const changeBucketName = (value) => {
    if (!value) return
    setBucketName(value)
    dispatch(setBucketNameThunk(value))
  }



  //initial data fetching
  useEffect(() => {
    dispatch(fetchVideosThunk())
    dispatch(fetchBucketsThunk())
    console.log("%cConvin.ai Frontend Assignment","Color: blue; font-size: 30px")
  }, [dispatch])

  // console.log(selectedVideos)

  return (
    <Layout className="layout">
      <CreateVideoModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div>
          <img src="logo.svg" alt="logo" />
        </div>
        <Title level={5}
          style={{ color: "white", opacity: .6, margin: 0 }}
          editable={activeBucketId && {
            tooltip: 'edit bucket name',
            onChange: (value) => changeBucketName(value),
          }}
        >{bucketName} </Title>
        <div>
          {selectedVideos.length &&
            <>
              <Button
                onClick={deleteVideo}
                danger
              >
                DELETE
              </Button>
              <Button
                type="text"
                style={{ color: "white", fontWeight: "bold" }}
                onClick={cancelDelete}
              >
                CANCEL
              </Button>
            </>
          }
          <Button
            type="primary"
            style={{ margin: "0 .8em" }}
            icon={<PlusOutlined />}
            onClick={() => setIsOpen(true)}
          >
            New Video
          </Button>
          <Select
            defaultValue={activeBucketId}
            value={bucketName}
            style={{
              width: 120,
            }}
            onChange={handleChange}
            loading={loading}
          >
            <Option value={0}>All</Option>
            {bucketList?.map(bucket => <Option key={bucket.id} value={bucket.id}>{bucket.name}</Option>)}
          </Select>
          <Button
            type="secondary"
            style={{ margin: "0 .8em" }}
            icon={<HistoryOutlined />}
            onClick={() => navigate("/history")}
          >
            History
          </Button>
        </div>
      </Header>
      <Content className="content">
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/history" element={<History />} />

        </Routes>
      </Content>
      <Footer className="footer">
        <a href="https://convin.ai">Convin.ai</a> Frontend Task
      </Footer>
    </Layout>
  );
}
