import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../utils/constants';

const videoSlice = createSlice({
    name: 'videos',
    initialState: {
        videoList: [...Array(4).keys()],
        loading: false,
        selectedVideos: []
    },
    reducers: {
        setVideoList: (state, action) => {
            state.videoList = action.payload
        },
        addVideo: (state, action) => {
            state.videoList.push(action.payload)
        },
        editVideo: (state, action) => {
            state.videoList = state.videoList.map(video=>{
                if(video.id === action.payload.id)
                    return action.payload
                return video
            })
        },
        selectVideo: (state, action) => {
            state.selectedVideos.push(action.payload)
        },
        unselectVideo: (state, action) => {
            state.selectedVideos = state.selectedVideos.filter(id=>id!==action.payload)
        },
        removeSelectedVideos: state => {
            state.selectedVideos = []
        },
        deleteVideos: (state, action) => {
            console.log(state.videoList.filter(video=>!action.payload.includes(video.id)));
            state.videoList = state.videoList.filter(video=>!action.payload.includes(video.id))
        },
        setStatus: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const { setVideoList, setStatus, addVideo, editVideo, selectVideo, removeSelectedVideos, unselectVideo, deleteVideos } = videoSlice.actions
export default videoSlice.reducer


export const fetchVideosThunk = () => async (dispatch) => {
    dispatch(setStatus(true))
    try {
        const { data: videos } = await axios.get(`${URL}/videos`)
        dispatch(setVideoList(videos))

    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))
}

export const createVideoThunk = (newVideoData) => async (dispatch, getState) => {
    dispatch(setStatus(true))
    const { buckets: { bucketList } } = getState()
    let newVideo = newVideoData.bucketId ?
        newVideoData : {
            name: newVideoData.name,
            link: newVideoData.link,
            bucketId: bucketList.length + 1
        }
    try {
        const {data} = await axios.post(`${URL}/videos`,
            JSON.stringify(newVideo),
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
        )
        dispatch(addVideo(data))
    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))
}

export const deleteVideosThunk = () => async (dispatch, getState) => {
    dispatch(setStatus(true))
    const {videos: {selectedVideos}} = getState()
    try {
        selectedVideos.forEach(async (id) => {
            await axios.delete(`${URL}/videos/${id}`)
        })
        dispatch(deleteVideos(selectedVideos))
        dispatch(removeSelectedVideos())
    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))
}

export const editVideoThunk = ({values, id}) => async (dispatch, getState) => {
    dispatch(setStatus(true))
    const { buckets: { bucketList } } = getState()
    let newVideo = values.bucketId ?
        values : {
            name: values.name,
            link: values.link,
            bucketId: bucketList.length + 1
        }
    try {
        const {data} = await axios.put(`${URL}/videos/${id}`,
            JSON.stringify(newVideo),
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
        )
        dispatch(editVideo(data))
    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))
}