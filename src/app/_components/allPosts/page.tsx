'use client';

import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Box, Paper, Card, CardHeader, CardMedia, CardContent, CardActions,Typography, Avatar, IconButton, TextField, Button } from '@mui/material';

import { Favorite as FavoriteIcon, Comment as CommentIcon} from '@mui/icons-material';
import { createComment, getPostComment } from '@/lib/commentSlice';

import { store } from '../../../lib/store';
import { PostData } from '../../../interfaces/postData';
import { CommentType } from '../../../interfaces/postData';
import { getSinglePost } from '@/lib/postsSlice';

import toast from 'react-hot-toast';
import CommentCard from '../commentCard/page';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import UserImg from '../../../imgs/blue-circle-with-white-user_78370-4707.avif'

export default function PostCard({post,allComments}:{post:PostData,allComments?:boolean}) {

  const [commentHidden,setCommentHidden]=useState(false)
  const [localComments, setLocalComments] = useState(post?.comments || []);

const dispatch=useDispatch<typeof store.dispatch>()
const navigate=useRouter()


const {comments} =useSelector((state:ReturnType <typeof store.getState>)=>state.CommentReducer)



  function handelSinglePost(id:string){
navigate.push(`/singlePost/${id}`)
  }

function handelComment(){
  setCommentHidden(!commentHidden)
}

const validate = Yup.object().shape({
  content: Yup.string()
    .required('Content is required')
    .min(2, 'Minimum length is 2 characters'),
});
const initialValues:{content:string,post:string}={content:"",post:post?._id}
const formik=useFormik({
  initialValues,
validationSchema:validate,

// submit add comment
onSubmit:(values:{content:string,post:string})=>{
  console.log(values)
  const loading =toast.loading('Loading...')
  dispatch(createComment(values))

  .then(res=>{
    console.log(res)
    toast.dismiss(loading)
    toast.success('Comment Posted...')
    formik.values.content=''
    setLocalComments(res.payload?.data?.comments)
    dispatch(getPostComment(post._id))
    // console.log(commentsByPostId)
  console.log(comments)
    setCommentHidden(false)
  }).catch(er=>{
    console.log(er)
    toast.dismiss(loading)
    toast.error('Failed to Post Comment...')
  })
}
})

useEffect(()=>{
  dispatch(getPostComment(post?._id))

},[])


return (
  <Card sx={{ maxWidth: '100%' ,my:5 }}>
   <Box >
   <CardHeader
      avatar={
        <Avatar   aria-label="recipe" sx={{cursor:'pointer'}}>
          <Image src={post?.user?.photo||UserImg} width={50} height={50} alt={post?.user?.name}/>
        </Avatar>
      }

      title={post?.user?.name}
      titleTypographyProps={
        {style:{width:'fit-content',cursor:'poniter'}}}
      subheader={new Date(post?.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    />
<Box onClick={()=>{handelSinglePost(post?._id)}}>

<CardContent>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
     {post?.body}
      </Typography>
    </CardContent>
  {post?.image?  <CardMedia
      component="img"
      height="250"
      image={post?.image}
      alt="image"
    />
  :null}
</Box>

   </Box>
{localComments?.length>0?<Box sx={{display:"flex",justifyContent:'end'}}><Typography sx={{paddingInline:3}}>{localComments?.length} comments</Typography></Box>:null}
   <CardActions disableSpacing sx={{display:'flex',justifyContent:"space-between",borderTop:'1px solid #eee',borderBottom:'1px solid #eee'}}>
      <IconButton aria-label="add to favorites"  sx={{
    ":hover": {
      backgroundColor: 'transparent',
    },
    ":focus": {
      backgroundColor: 'transparent',
    }
  }}>
        <FavoriteIcon sx={{marginRight:1}} /><Typography>Like</Typography>
      </IconButton>
      <IconButton aria-label="comment" onClick={handelComment} sx={{
    ":hover": {
      backgroundColor: 'transparent',
    },
    ":focus": {
      backgroundColor: 'transparent',
    }
  }}>
      <CommentIcon sx={{marginRight:1}}/> <Typography>Comment</Typography>
      </IconButton>

   
    </CardActions>
{commentHidden?<Box>
<Paper sx={{p:2}}>
        <form  onSubmit={formik.handleSubmit}>
        <TextField id="content"  value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Enter Your Comment" variant="outlined" sx={{width:'100%' ,mb:2}} name='content' type='text' />
       {formik.errors.content&&formik.touched.content&&<Typography sx={{color:'red',mb:2}}>*{formik.errors.content}</Typography>} 
        <Button fullWidth disabled={!formik.isValid?true:false}  sx={{border:'1px solid #1976D2',':hover':{backgroundColor:'#1976D2',color:'white'}}} type='submit'>Add Comment</Button>
        </form>

</Paper>

</Box>:null}



{/* single comment */}
{!allComments &&  post?.comments?.length > 0 &&
<CommentCard comment={post?.comments[0]} />
}


{/* All Comments */}
{allComments&& post?.comments?.length > 0 &&
comments?.map((comment:CommentType) => (
  <CommentCard
    key={comment._id}
    comment={comment}

  />
))}


{/* no comments yet */}
{ localComments?.length===0?<Typography sx={{textAlign:'center' ,padding:3}}>No comments yet</Typography>:null}
  </Card>
);
}