'use client'
import React from 'react'
import Image from 'next/image'
import { Box, Paper, Typography ,Button} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {UserDataInfo} from '../../../interfaces/postData';
import { styled } from '@mui/material/styles';
import {useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function UserData({userData}:{userData:UserDataInfo}) {
  const [imgVal,setImgVal]=useState('')
const [imgSrc,setImgSrc]=useState('')
const navigate=useRouter()

  function handelImgVal(e:any){
    console.log(e.target.files[0])
setImgVal(e.target.files[0])
let urlImg= URL.createObjectURL(e.target.files[0])
setImgSrc(urlImg)
}
function handelSubmitPhoto(){
  const formdata=new FormData()
  formdata.append('photo',imgVal)
  const loading =toast.loading('Loading...')
  axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,formdata,{headers:{token:localStorage.getItem('userToken')}})
   .then(res=>{
    toast.dismiss(loading)
    toast.success("photo changed successfully...")
   }).catch(er=>{
    toast.dismiss(loading)
    toast.error("failed to change photo...")
    console.log(er)
   })
}

  return    <Paper
  sx={{
    my: 8,
    textAlign: 'center',
    padding: '5rem 2rem 2rem',
    position: 'relative',
  }}
>

  <Box
    sx={{
      position: 'absolute',
      top: '-50px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: 100,
      height: 100,
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow: 3,
    }}
  >
    <Image
      src={imgSrc ? imgSrc : userData?.photo}
      alt={userData?.name}
      width={100}
      height={100}
    />
  </Box>


  <Box sx={{ textAlign: 'left'}}> 

    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 ,mb:3}}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Choose Photo
        <input
          type="file"
          onChange={(e) => handelImgVal(e)}
          multiple
          hidden
        />
      </Button>
      <Button
        variant="outlined"
        onClick={handelSubmitPhoto}
        disabled={!imgVal}
      >
        Upload Photo
      </Button>
    </Box>


    <Typography sx={{ mb: 1 }}>
      <span style={{ fontWeight: 'bold' }}>Name:</span> {userData?.name}
    </Typography>
    <Typography sx={{ mb: 1 }}>
      <span style={{ fontWeight: 'bold' }}>Email:</span> {userData?.email}
    </Typography>
    <Typography sx={{ mb: 1 }}>
      <span style={{ fontWeight: 'bold' }}>Birthday:</span> {userData?.dateOfBirth}
    </Typography>
    <Typography sx={{ mb: 1 }}>
      <span style={{ fontWeight: 'bold' }}>Gender:</span> {userData?.gender}
    </Typography>


  </Box>
</Paper>
}
