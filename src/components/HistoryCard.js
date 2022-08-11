import React from 'react'
import { Card } from 'antd'
import trim from '../utils/stringTrimmer'

function HistoryCard({video}) {
    return (
        <Card
            title={video.name}
            extra={<p style={{opacity: 0.6}}>{video.playedAt}</p>}
        >
            <a>{trim(video.link, 60)}</a>
        </Card>
    )
}

export default HistoryCard