import { HistoryOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Layout, message, Select, Typography } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setActiveBucketId, setBucketNameThunk } from '../redux/bucketSlice';
import { deleteVideosThunk, removeSelectedVideos } from "../redux/videoSlice";
const { Header } = Layout
const { Option } = Select
const { Title } = Typography;


function Navbar({ setIsOpen }) {
  const activeBucketId = useSelector(state => state.buckets.activeBucketId)
  const loading = useSelector(state => state.videos.loading)
  const bucketList = useSelector(state => state.buckets.bucketList)
  const selectedVideos = useSelector(state => state.videos.selectedVideos)
  //To conditionally render new video button and bucket in navbar
  const [isUserOnVideoPage, setIsUserOnVideoPage] = useState(false)
  const location = useLocation()

  const [bucketName, setBucketName] = useState("All")
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  useEffect(() => {
    if (location.pathname === '/')
      setIsUserOnVideoPage(true)
    else
      setIsUserOnVideoPage(false)
  }, [location])

  return (
    <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div>
        <Link to='/'>
          <Typography.Title level={3} className='logo'>Logo</Typography.Title>
        </Link>
      </div>
      {isUserOnVideoPage ?
        <Title level={5}
          style={{ color: "white", opacity: .8, margin: 0 }}
          editable={activeBucketId && {
            tooltip: 'edit bucket name',
            onChange: (value) => changeBucketName(value),
          }}
        >
          {bucketName}
        </Title> :
        <Title level={5} style={{ color: "white", opacity: .8, margin: 0 }}>History </Title>
      }
      <div>
        {isUserOnVideoPage ?
          <>
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
              <Option value={0} >
                All
              </Option>
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
          </> :
          <>

            <Button
              type="text"
              style={{ color: "white", fontWeight: "bold" }}
              onClick={() => navigate('/')}
            >
              HOME
            </Button>
          </>
        }
      </div>
    </Header>
  )
}

export default Navbar