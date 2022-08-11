import {configureStore} from "@reduxjs/toolkit";
import videoReducer from './videoSlice'
import bucketReducer from './bucketSlice'

export default configureStore({
    reducer : {
        videos: videoReducer,
        buckets: bucketReducer
    }
})