import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from 'react-redux'
import VideoCard from "./Card"

const filterBucketVideos = (videos, activeBucketId) => {
    if (activeBucketId === 0)
        return videos
    return videos.filter(video => video.bucketId === activeBucketId)
}

function CardList() {
    const videos = useSelector(state => state.videos.videoList)
    const activeBucketId = useSelector(state => state.buckets.activeBucketId)
    const [bucketVideos, setBucketVideos] = useState(() => filterBucketVideos(videos, activeBucketId))

    useEffect(() => {
        setBucketVideos(filterBucketVideos(videos, activeBucketId))
        // console.log(videos);
    }, [activeBucketId, videos])

    return (
        <>
            <Row gutter={[16, 16]}>
                {bucketVideos.length>0 ?
                    bucketVideos.map((video) => (
                        <Col key={video.id || video} sm={24} md={12} xl={6}>
                            <VideoCard video={video} />
                        </Col>
                    )) :
                    <Typography.Title level={4} style={{width: "100%", opacity: "0.6", textAlign: "center"}}>No Videos in this Bucket</Typography.Title>
                }
            </Row>
        </>
    );
};

export default CardList;
