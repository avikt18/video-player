import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BucketCard from "./BucketCard";
import VideoCard from "./Card";
import CreateBucketModal from "./CreateBucketModal";
import CreateVideoModal from "./CreateVideoModal";

const filterBucketVideos = (videos, bucketId) => {
  if (bucketId === 0) return videos;
  return videos.filter((video) => video.bucketId === bucketId);
};

function CardList({ isVideoList, isBucketList }) {
  const videos = useSelector((state) => state.videos.videoList);
  const buckets = useSelector((state) => state.buckets.bucketList);
  const activeBucketId = useSelector((state) => state.buckets.activeBucketId);
  const [isBucketModalOpen, setIsBucketModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [bucketVideos, setBucketVideos] = useState(() =>
    filterBucketVideos(videos, activeBucketId)
  );
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    setBucketVideos(filterBucketVideos(videos, id));
  }, [id, videos]);

  return (
    <>
      {/* Create New Bucket Modal */}
      <CreateBucketModal
        isOpen={isBucketModalOpen}
        setIsOpen={setIsBucketModalOpen}
      />
      {/* Create New Video Modal */}
      <CreateVideoModal
        isOpen={isVideoModalOpen}
        setIsOpen={setIsVideoModalOpen}
      />
      <Row justify="space-between" gutter={[0, 10]}>
        <Col>
          <Title level={4} style={{}}>
            {isBucketList ? "Buckets" : `Bucket - `}
          </Title>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{ margin: "0 .8em" }}
            icon={<PlusOutlined />}
            onClick={
              isBucketList
                ? () => setIsBucketModalOpen(true)
                : () => setIsVideoModalOpen(true)
            }
          >
            New {isBucketList ? "Bucket" : "Video"}
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {isVideoList &&
          (bucketVideos?.length > 0 ? (
            bucketVideos.map((video) => (
              <Col key={video.id || video} sm={24} md={12} xl={6}>
                <VideoCard video={video} />
              </Col>
            ))
          ) : (
            <Typography.Title
              level={4}
              style={{ width: "100%", opacity: "0.6", textAlign: "center" }}
            >
              No Videos in this Bucket
            </Typography.Title>
          ))}
        {isBucketList &&
          (buckets?.length > 0 ? (
            buckets.map((bucket, id) => (
              <Col key={bucket.id || id} sm={24} md={12} xl={6}>
                <BucketCard bucket={bucket} />
              </Col>
            ))
          ) : (
            <Typography.Title
              level={4}
              style={{ width: "100%", opacity: "0.6", textAlign: "center" }}
            >
              No Buckets
            </Typography.Title>
          ))}
      </Row>
    </>
  );
}

export default CardList;
