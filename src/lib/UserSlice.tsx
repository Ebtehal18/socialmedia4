import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {UserDataInfo} from '../interfaces/postData';
import {PostData} from '../interfaces/postData'
export const getUserPosts=createAsyncThunk('UserSlice/getUserPosts',(id:string)=>{
return    axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`,{headers:{token:localStorage.getItem('userToken')}})
    .then((res)=>(res))
    .catch(err=>(err))
})
export const getUserData=createAsyncThunk('UserSlice/getUserData',()=>{
return    axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{headers:{token:localStorage.getItem('userToken')}})
    .then((res)=>(res))
    .catch(err=>(err))
})



const initialState:{userPosts:PostData[]|null,isLoading:boolean,userData:null|UserDataInfo}={userPosts:null,isLoading:false,userData:null}

const UserSlice=createSlice({
    initialState,
    name:'UserSlice',
    reducers:{},
    
extraReducers:function(builder){
builder.addCase(getUserPosts.pending,(state)=>{

state.isLoading=true
})
builder.addCase(getUserPosts.fulfilled,(state,action)=>{
    state.userPosts=action?.payload?.data?.posts
    console.log(action?.payload?.data?.posts)
state.isLoading=false
})
builder.addCase(getUserPosts.rejected,(state)=>{

state.isLoading=false
})
builder.addCase(getUserData.pending,(state)=>{

state.isLoading=true
})
builder.addCase(getUserData.fulfilled,(state,action)=>{
console.log(action?.payload?.data?.user)
  state.userData=(action?.payload?.data?.user)
state.isLoading=false
})
builder.addCase(getUserData.rejected,(state)=>{

state.isLoading=false
})

 
}
})

export const  UserRdeucer=UserSlice.reducer