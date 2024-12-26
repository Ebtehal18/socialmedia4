
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import {CommentType} from '../interfaces/postData'

const initialState:{comments:CommentType[]|[],isLoading:boolean,isError:boolean,total:string}={comments:[],isLoading:false,isError:false,total:'' }

export const createComment=createAsyncThunk('commentSlice/createComment',(values:{content:string,post:string})=>{
  return  axios.post(`https://linked-posts.routemisr.com/comments`,values,{headers:{token:localStorage.getItem("userToken")}})
    .then(res=>(res))
    .catch(er=>(er))
    
})
export const getPostComment=createAsyncThunk('commentSlice/getPostComment',(id:string)=>{
  return  axios.get(`https://linked-posts.routemisr.com/posts/${id}/comments`,{headers:{token:localStorage.getItem("userToken")}})
    .then(res=>(res))
    .catch(er=>(er))
    
})
export const commentSlice=createSlice({
    initialState,
    name:'commentSlice',
    reducers:{},
    extraReducers:function(builder){
    
         builder.addCase(createComment.pending,(state)=>{
                state.isLoading=false
                state.isError=false
            });
            builder.addCase(createComment.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.comments=action?.payload?.data?.comments
              
                state.isLoading=false
                state.isError=false
            });
            builder.addCase(createComment.rejected,(state)=>{
                state.isLoading=false
                state.isError=false
            })
         builder.addCase(getPostComment.pending,(state)=>{
                state.isLoading=false
                state.isError=false
            });
            builder.addCase(getPostComment.fulfilled,(state,action)=>{
                console.log(action?.payload)
                state.comments=action?.payload?.data?.comments

              state.total=action?.payload?.data?.total
                state.isLoading=false
                state.isError=false
            });
            builder.addCase(getPostComment.rejected,(state)=>{
                state.isLoading=false
                state.isError=false
            })
    }
})
export const CommentReducer=commentSlice.reducer