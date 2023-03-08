import { HistoryOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Layout, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteVideosThunk, removeSelectedVideos } from "../redux/videoSlice";
const { Header } = Layout;

function Navbar() {
  const selectedVideos = useSelector((state) => state.videos.selectedVideos);
  //To conditionally render new video button and bucket in navbar
  const [showBtns, setShowBtns] = useState({
    historyBtn: true,
    bucketBtn: false,
  });
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const deleteVideo = () => {
    message.info(`${selectedVideos.length} Video(s) Deleted`);
    dispatch(deleteVideosThunk());
  };

  const cancelDelete = () => {
    dispatch(removeSelectedVideos());
  };

  useEffect(() => {
    if (location.pathname === "/") setShowBtns(value => ({...value, bucketBtn: false}));
    else setShowBtns(value => ({...value, bucketBtn: true}));
    if (location.pathname === "/history") setShowBtns(value => ({...value, historyBtn: false}));
    else setShowBtns(value => ({...value, historyBtn: true}));
  }, [location]);

  return (
    <Header
      className="header"
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        paddingInline: "1em",
      }}
    >
      <div>
        <Link to="/">
          <Typography.Title level={3} className="logo">
            Frontend Task
          </Typography.Title>
        </Link>
      </div>
      <div>
        {showBtns.bucketBtn ? (
          <>
            {selectedVideos.length ? (
              <>
                <Button onClick={deleteVideo} danger>
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
            ) : null}
            <Button
              type="default"
              style={{ margin: "0 .8em" }}
              icon={<MenuOutlined />}
              onClick={() => navigate("/")}
            >
              Buckets
            </Button>
          </>
        ) : null}
        {showBtns.historyBtn ? (
          <Button
            type="default"
            style={{ margin: "0 .8em" }}
            icon={<HistoryOutlined />}
            onClick={() => navigate("/history")}
          >
            History
          </Button>
        ) : null}
      </div>
    </Header>
  );
}

export default Navbar;
