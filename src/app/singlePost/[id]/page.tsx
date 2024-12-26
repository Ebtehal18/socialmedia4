'use client';

import PostCard from '@/app/_components/allPosts/page';
import Loading from '@/app/_components/Loading/page';
import { getSinglePost } from '@/lib/postsSlice';
import { store } from '@/lib/store';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { useParams } from 'next/navigation'; 

export default function SinglePost() {
  const params = useParams(); 
  const { id } = params as { id: string }; 

  const { singlepost, isLoading } = useSelector((state: ReturnType<typeof store.getState>) => state.postsReducer );
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    dispatch(getSinglePost(id));

    

  }, []);

  if (isLoading) return <Loading />;
  if (!singlepost) return <p>Post not found.</p>; 

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
      <Box sx={{ gridColumn: 'span 3' }}></Box>
      <Box
        sx={{
          gridColumn: { xs: 'span 12', sm: 'span 12', xl: 'span 6' },
          paddingInline: { xs: '12px', xl: '0' },
        }}
      >
        <PostCard post={singlepost} allComments={true} />
      </Box>
      <Box sx={{ gridColumn: 'span 3' }}></Box>
    </Box>
  );
}

