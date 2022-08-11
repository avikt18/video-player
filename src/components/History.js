import React from 'react'
import { Col, Row, Typography } from "antd";
import HistoryCard from './HistoryCard'
import { useState } from 'react';
import { useEffect } from 'react';

function History() {
    const [videoHistory, setVideoHistory] = useState([])

    useEffect(() => {
        let userHistory = localStorage.getItem("userHistory")
        userHistory = JSON.parse(userHistory)
        if (userHistory)
            setVideoHistory(userHistory)
    }, [])

    return (
        <div className='history-container'>
            {
                videoHistory.length > 0 ?
                    videoHistory.map((video, id) => (
                        <Row key={id} style={{marginBottom: "1em"}} justify='center'>
                            <Col key={video.id || video} span={12}>
                                <HistoryCard video={video} />
                            </Col>
                        </Row>
                    )) :
                    <Typography.Title level={4} style={{ width: "100%", opacity: "0.6", textAlign: "center" }}>No History</Typography.Title>
            }
        </div>
    )
}

export default History