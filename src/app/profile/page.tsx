'use client'

import React, { useEffect } from 'react'
import Loading from '../_components/Loading/page'
import { Box } from '@mui/material';
import {getUserData, getUserPosts} from '../../lib/UserSlice';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import {store} from '../../lib/store';
import UserData from '../_components/userdata/page';
import PostCard from '../_components/allPosts/page';


 export default function Profile() {
  const { userData } = useSelector((state: ReturnType<typeof store.getState>) => state.UserRdeucer);
  const { userPosts } = useSelector((state: ReturnType<typeof store.getState>) => state.UserRdeucer);
  const dispatch=useDispatch<typeof store.dispatch>()
useEffect(()=>{
    dispatch(getUserData()).then((res)=>console.log(res)).catch((er)=>console.log(er))
    console.log(userData)
},[])
useEffect(()=>{
    if(userData){
        dispatch((getUserPosts(userData?._id))).then((res)=>console.log(res)).catch((er)=>console.log(er))
        console.log(userData)
    }
  
},[userData])


return <>

 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
  <Box sx={{ gridColumn: 'span 3' }}>

   </Box>
   <Box  sx={{gridColumn: { xs: 'span 12', sm: 'span 12', xl: 'span 6' } ,paddingInline:{xs:'12px',xl:'0'}} }>

     {userData ?  <Container maxWidth="sm"sx={{marginBlock:3}} >
     <UserData userData={userData}/>
    
  </Container>
 
 
 :<Loading/>}

 {userPosts? userPosts.map((post=><PostCard post={post}  key={post._id}  />)):<Loading/>}



 </Box>


   <Box sx={{ gridColumn: 'span 3' }}>

   </Box>

 </Box>

</>
}
