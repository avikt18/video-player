import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Text from "antd/es/typography/Text";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBucketNameThunk, deleteBucketThunk } from '../redux/bucketSlice';
import { useNavigate } from "react-router-dom";

function BucketCard({ bucket }) {
  const loading = useSelector((state) => state.videos.loading);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [bucketName, setBucketName] = useState("")

  const changeBucketName = (value) => {
    if (!value) return
    setBucketName(value)
    dispatch(setBucketNameThunk(value, bucket.id))
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    dispatch(deleteBucketThunk(bucket.id))
  }

  useEffect(()=>{
    if(bucket.name)
      setBucketName(bucket.name)
  }, [bucket])

  return (
    <Card
      hoverable
      loading={loading}
      actions={
        !loading && [
          <DeleteOutlined disabled={loading} key="delete" onClick={handleDelete} />,
        ]
      }
      onClick={() => navigate(`/bucket/${bucket.id}`)}
      >
      <Text
      style={{fontWeight: "bold", fontSize: "1rem"}}
        editable={{
          tooltip: "edit bucket name",
          onChange: (value) => changeBucketName(value),
        }}
        onClick = {(e)=> e.stopPropagation()}
      >
        {bucketName}
      </Text>
    </Card>
  );
}

export default BucketCard;
