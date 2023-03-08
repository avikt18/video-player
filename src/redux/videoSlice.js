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
        deleteBucketVideos: (state, action) => {
            const bucketId = action.payload
            console.log(bucketId)
            state.videoList = state.videoList.filter(video=>video.id !== bucketId)
            console.log(state.videoList)
        }
    }
})

export const { setVideoList, setStatus, addVideo, editVideo, selectVideo, removeSelectedVideos, unselectVideo, deleteVideos, deleteBucketVideos } = videoSlice.actions
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

export const createVideoThunk = (newVideoData) => async (dispatch) => {
    dispatch(setStatus(true))
    try {
        const {data} = await axios.post(`${URL}/videos`,
            JSON.stringify(newVideoData),
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

export const deleteBucketVideosThunk = (bucketId) => async (dispatch, getState) => {
    dispatch(setStatus(true))
    const {videos: {videoList}} = getState()
    let bucketVideos = videoList.filter(video => video.bucketId === bucketId)
    bucketVideos = bucketVideos.map(video => video.id)
    try {
        bucketVideos.forEach(async (id) => {
            await axios.delete(`${URL}/videos/${id}`)
        })
        dispatch(deleteBucketVideos(bucketId))
    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))
}

export const editVideoThunk = ({values, id}) => async (dispatch, getState) => {
    dispatch(setStatus(true))

    try {
        const {data} = await axios.put(`${URL}/videos/${id}`,
            JSON.stringify(values),
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
        )
        dispatch(editVideo(data))
    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))
}