import { EditOutlined } from '@ant-design/icons';
import { Card, Checkbox, Modal, Typography} from "antd";
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVideo, unselectVideo } from '../redux/videoSlice';
import EditVideoModal from './EditVideoModal';
import trim from "../utils/stringTrimmer";
import moment from 'moment';

function VideoCard({ video }) {
    const loading = useSelector(state => state.videos.loading)
    const selectedVideos = useSelector(state => state.videos.selectedVideos)
    const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch()
    const {Link} = Typography

    const onChange = (e) => {
        e.stopPropagation()
        setSelected(!selected)
        if (!selected)
            dispatch(selectVideo(video.id))
        else
            dispatch(unselectVideo(video.id))
    }

    useEffect(() => {
        if (!selectedVideos.length)
            setSelected(false)
    }, [selectedVideos])

    const handleEdit = (e) => {
        e.stopPropagation()
        setIsEditModalOpen(true)
    }

    const playVideo = () => {
        setIsPlayerModalOpen(true)
        let newHistory = []
        newHistory.push({...video, playedAt: moment().format('MM/DD/YYYY, h:mm a')})
        let oldHistory = JSON.parse(localStorage.getItem("userHistory"))
        // console.log(oldHistory);
        if (oldHistory)
            newHistory = [...newHistory, ...oldHistory]
        console.log(newHistory);
        localStorage.setItem("userHistory", JSON.stringify(newHistory))
    }

    return (
        <>
            {isPlayerModalOpen &&
                <Modal width={848} title="Video" open={isPlayerModalOpen} onCancel={() => setIsPlayerModalOpen(false)} footer={null}>
                    <iframe className="video-player" src={video.link} title={video.name} allowFullScreen></iframe>
                </Modal>
            }
            <EditVideoModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} video={video} />
            <Card
                title={video.name}
                hoverable
                loading={loading}
                actions={!loading && [
                    <EditOutlined disabled={loading} key="edit" onClick={handleEdit} />,
                ]}
                onClick={playVideo}
                extra={<Checkbox checked={selected} onClick={onChange} />}
            >
                <Link>{trim(video.link)}</Link>
            </Card>
        </>
    )
}

export default VideoCard