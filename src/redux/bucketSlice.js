import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL} from '../utils/constants';
import { deleteBucketVideosThunk } from './videoSlice';
import { v4 as uuid } from 'uuid';
import { setStatus } from './videoSlice';

const bucketSlice = createSlice({
    name: 'buckets',
    initialState: {
        bucketList: [...Array(4).keys()],
        activeBucketId: 0
    },
    reducers: {
        setBucketLists: (state, action) => {
            state.bucketList = action.payload
        },
        addBucket: (state, action) => {
            state.bucketList.push(action.payload)
        },
        setActiveBucketId: (state, action) => {
            state.activeBucketId = action.payload
        },
        deleteBucket: (state, action) => {
            const bucketId = action.payload
            state.bucketList = state.bucketList.filter(bucket=>bucket.id !== bucketId)
            console.log(state.bucketList)
        }
    }
})

export const { setBucketLists, setActiveBucketId, addBucket, deleteBucket } = bucketSlice.actions
export default bucketSlice.reducer

export const fetchBucketsThunk = () => async (dispatch) => {
    try {
        const { data: buckets } = await axios.get(`${URL}/buckets`)
        dispatch(setBucketLists(buckets))
    } catch (error) {
        console.log(error)
    }
}


export const setBucketNameThunk = (bucketName, id) => async (dispatch, getState) => {
    try {
        const { buckets: { bucketList, activeBucketId } } = getState()

        const res = await axios.patch(`${URL}/buckets/${id}`, JSON.stringify({
            name: bucketName,
        }), {
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })

        dispatch(setBucketLists(bucketList.map(list => {
            if (list.id === activeBucketId) {
                return {
                    ...list,
                    name: bucketName
                }
            }
            return list
        })))

        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

export const createBucketThunk = (newBucketName) => async (dispatch) => {
    dispatch(setStatus(true))
    try {
        const id = uuid()
        const {data} = await axios.post(`${URL}/buckets`,
            JSON.stringify({ id, name: newBucketName }),
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }  
        )
        dispatch(addBucket(data))
    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))

}

export const deleteBucketThunk = (bucketId) => async (dispatch) => {
    dispatch(setStatus(true))
    try {
        await axios.delete(`${URL}/buckets/${bucketId}`)
        dispatch(deleteBucket(bucketId))
        dispatch(deleteBucketVideosThunk(bucketId))
    } catch (error) {
        console.log(error)
    }
    dispatch(setStatus(false))
}

