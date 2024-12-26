import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';

import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/lib/store';
import { getAllPosts } from '@/lib/postsSlice';

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
  


export default function CreatePost() {

  const dispatch= useDispatch<typeof store.dispatch>()
  const [bodyVal,setBodyVal]=useState('')
const [imgVal,setImgVal]=useState('')
const [imgSrc,setImgSrc]=useState('')

    function handelBodyContent(e:any){
console.log(e.target.value)
setBodyVal(e.target.value)
    }
    function handelImgVal(e:any){
      console.log(e.target.files[0])
setImgVal(e.target.files[0])
const urlImg= URL.createObjectURL(e.target.files[0])
setImgSrc(urlImg)
}

function createPost(){
  const formdata=new FormData()
  formdata.append('body',bodyVal)
  if (imgVal){

    formdata.append('image',imgVal)
  }
  const loading =toast.loading('Loading...')
  axios.post(`https://linked-posts.routemisr.com/posts`,formdata,{headers:{token:localStorage.getItem('userToken')}})
  .then((res)=>{
    console.log(res)
    toast.dismiss(loading)
    toast.success('Post Created')
    dispatch(getAllPosts())

    setImgSrc('')
    setBodyVal('')
  })
  .catch((err)=>{
    toast.dismiss(loading)
    console.log(err)
    toast.error('failed to create post')
  }) 
}

  return <Paper sx={{padding:4,my:3}}>
   <Typography variant='h5' sx={{my:2}}>
    Create Post
   </Typography>
   <TextField
   value={bodyVal}
   onChange={(e)=>handelBodyContent(e)}
          id="outlined-multiline-flexible"
          label="What's on your mind?"
          multiline
          rows={5}
          fullWidth
        />
 {imgSrc?  <Box sx={{textAlign:'center',position:'relative',mt:3}}>     
    <img src={imgSrc}  alt="image" style={{ width: '500px' }} />
    <CloseIcon sx={{position:'absolute',top:0,right:0}} onClick={()=>
      {setImgSrc('')
        setImgVal('')
      }}/>
   </Box>:null}
            <Button
            fullWidth
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{my:2}}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(e) =>handelImgVal(e) }
        multiple
      />
    </Button>
    <Button fullWidth  onClick={createPost} sx={{border:'1px solid #1976D2',':hover':{backgroundColor:'#1976D2',color:'white'}}} type='submit'>Submit</Button>
  </Paper>
}
