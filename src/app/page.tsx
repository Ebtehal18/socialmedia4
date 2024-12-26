'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/lib/postsSlice";


import { useEffect } from 'react';
import Box from '@mui/material/Box';


import { store } from '@/lib/store';
import {PostData} from '../interfaces/postData';
import PostCard from "./_components/allPosts/page";
import CreatePost from "./_components/createPost/page";

import Loading from "./_components/Loading/page";



export default function Home() {
 const {posts,isLoading} =useSelector((state:ReturnType <typeof store.getState>)=>state.postsReducer)


 const dispatch= useDispatch<typeof store.dispatch>()

 useEffect(()=>{
  dispatch(getAllPosts())
  .then(response=>{
    console.log(response)
  })
  .catch((error=>console.log(error)))

 

 },[])


 const filteredData = structuredClone(posts);

const newPosts=filteredData?.sort((a:PostData,b:PostData)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())
console.log(newPosts)


if(isLoading) return <Loading />
  return <>
<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
  <Box sx={{ gridColumn: 'span 3' }}>

  </Box>
  <Box  sx={{gridColumn: { xs: 'span 12', sm: 'span 12', xl: 'span 6' } ,paddingInline:{xs:'12px',xl:'0'}} }>
    {/* create post */}
    <CreatePost/>
    {/* all posts */}
  {newPosts?.map((post: PostData) => <PostCard post={post} key={post._id} />)}
</Box>


  <Box sx={{ gridColumn: 'span 3' }}>

  </Box>

</Box>
  </>
}
