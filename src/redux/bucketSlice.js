import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../utils/constants';

const bucketSlice = createSlice({
    name: 'buckets',
    initialState: {
        bucketList: null,
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
        }
    }
})

export const { setBucketLists, setActiveBucketId, addBucket } = bucketSlice.actions
export default bucketSlice.reducer

export const fetchBucketsThunk = () => async (dispatch) => {
    try {
        const { data: buckets } = await axios.get(`${URL}/buckets`)
        dispatch(setBucketLists(buckets))
    } catch (error) {
        console.log(error)
    }
}


export const setBucketNameThunk = (bucketName) => async (dispatch, getState) => {
    try {
        const { buckets: { bucketList, activeBucketId } } = getState()

        const res = await axios.patch(`${URL}/buckets/${activeBucketId}`, JSON.stringify({
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
    try {
        const {data} = await axios.post(`${URL}/buckets`,
            JSON.stringify({ name: newBucketName }),
            { headers: { 'Content-type': 'application/json; charset=UTF-8' } }  
        )
        dispatch(addBucket(data))
    } catch (error) {
        console.log(error)
    }
}

