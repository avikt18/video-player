import { Layout } from "antd";
import "antd/dist/reset.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CardList from "./components/CardList";
import History from "./components/History";
import Navbar from "./components/Navbar";
import { fetchBucketsThunk } from "./redux/bucketSlice";
import { fetchVideosThunk } from "./redux/videoSlice";
import "./styles.css";
const { Content, Footer } = Layout;

export default function App() {
  const dispatch = useDispatch();

  //initial data fetching
  useEffect(() => {
    dispatch(fetchVideosThunk());
    dispatch(fetchBucketsThunk());
    console.log(
      "%cConvin.ai Frontend Assignment",
      "Color: blue; font-size: 30px"
    );
  }, [dispatch]);


  return (
    <Layout className="layout">
      <Navbar />
      <Content className="content">
        <Routes>
          <Route path="/" element={<CardList isBucketList />} />
          <Route path="/bucket/:id" element={<CardList isVideoList />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Content>
      
      <Footer className="footer">
        <a href="https://convin.ai">Convin.ai</a> Frontend Task
      </Footer>
    </Layout>
  );
}
