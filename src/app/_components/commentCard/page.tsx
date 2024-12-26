'use client'
import React from 'react';

import { Avatar, Box,  CardContent, CardHeader, Typography,Paper,TextField,Button } from '@mui/material';
import Image from 'next/image';
import UserImg from '../../../imgs/blue-circle-with-white-user_78370-4707.avif';

import {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import {store} from '../../../lib/store'
import CreateIcon from '@mui/icons-material/Create';
import {CommentType} from '../../../interfaces/postData';
import { useFormik } from 'formik';
import * as Yup from 'yup'


export default function CommentCard({comment}:{comment:CommentType}) {

 
    const { userData } = useSelector((state: ReturnType<typeof store.getState>) => state.UserRdeucer);




  return (
    <Box sx={{ backgroundColor: '#eee', borderRadius: 2, margin: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            sx={{ cursor: 'pointer' }}
          >
            <Image
              src={userData?.photo||UserImg}
              width={50}
              height={50}
              alt={comment?.commentCreator?.name || 'user photo'}
            />
          </Avatar>
        }
        title={comment?.commentCreator?.name}
        titleTypographyProps={{
          style: { width: 'fit-content', cursor: 'pointer' },

        }}
        subheader={new Date(comment?.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      />
      <CardContent>
{comment.content}


      </CardContent>
    </Box>
  );
}
