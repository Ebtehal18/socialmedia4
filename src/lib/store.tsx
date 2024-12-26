import { configureStore } from '@reduxjs/toolkit';
import {  authReducer } from './authSlice';
import { postsReducer } from './postsSlice';
import { UserRdeucer } from './UserSlice';
import {CommentReducer} from './commentSlice'
export const store=configureStore({
reducer:{
    authReducer,
    postsReducer,
    UserRdeucer,
    CommentReducer
}
})

