import { Layout } from 'antd';
import 'antd/dist/reset.css';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import CardList from "./components/CardList";
import CreateVideoModal from "./components/CreateVideoModal";
import History from "./components/History";
import Navbar from './components/Navbar';
import { fetchBucketsThunk } from "./redux/bucketSlice";
import { fetchVideosThunk } from "./redux/videoSlice";
import "./styles.css";
const { Content, Footer } = Layout


export default function App() {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)


  //initial data fetching
  useEffect(() => {
    dispatch(fetchVideosThunk())
    dispatch(fetchBucketsThunk())
    console.log("%cConvin.ai Frontend Assignment", "Color: blue; font-size: 30px")
  }, [dispatch])

  // console.log(selectedVideos)

  return (
    <Layout className="layout">
      {/* Create New Video Modal */}
      <CreateVideoModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <Navbar setIsOpen={setIsOpen} />

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
