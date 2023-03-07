import React from 'react'
import { Card, Typography } from 'antd'
import trim from '../utils/stringTrimmer'

function HistoryCard({video}) {
    const {Link} = Typography
    return (
        <Card
            title={video.name}
            extra={<p style={{opacity: 0.6}}>{video.playedAt}</p>}
        >
            <Link>{trim(video.link, 60)}</Link>
        </Card>
    )
}

export default HistoryCard