import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {PostData} from'../interfaces/postData'

export const getAllPosts=createAsyncThunk('postsSlice/getAllPosts',async()=>{
     return  await axios.get(`https://linked-posts.routemisr.com/posts?limit=50&page=42`,
       {headers:{
        token:localStorage.getItem("userToken")
       }})
       .then((response)=>{return response})
       .catch((error)=>{return error})
    })
export const getSinglePost=createAsyncThunk('postsSlice/getSinglePost',async(id:string)=>{
     return  await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,
       {headers:{
        token:localStorage.getItem("userToken")
       }})
       .then((response)=>{return response})
       .catch((error)=>{return error})
    })


const initialState:{posts:PostData[]|null,isLoading:boolean,isError:boolean,singlepost:PostData|null}={
    posts:null,
    isLoading:false,
    isError:false,
    singlepost:null
}

const postsSlice=createSlice({
    name:'postsSlice',
initialState,
reducers:{

},
extraReducers:function(builder){
    // get all posts
builder.addCase(getAllPosts.pending,(state)=>{
state.isError=false
state.isLoading=true
});
builder.addCase(getAllPosts.fulfilled,(state,action)=>{
state.posts=action?.payload?.data?.posts
state.isLoading=false
state.isError=false
});
builder.addCase(getAllPosts.rejected,(state)=>{
state.isError=true;
state.isLoading=false
});
// get single post
builder.addCase(getSinglePost.pending,(state)=>{
state.isError=false
state.isLoading=true
})
builder.addCase(getSinglePost.fulfilled,(state,action)=>{
    console.log(action)
state.singlepost=action?.payload?.data?.post
state.isLoading=false
state.isError=false
})
builder.addCase(getSinglePost.rejected,(state)=>{
state.isError=true
state.isLoading=false
})


}
})

export const postsReducer=postsSlice.reducer