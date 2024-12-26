'use client'
import React from 'react'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { submitLogin } from '@/lib/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/lib/store';
import toast from 'react-hot-toast'
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { isLoading } = useSelector((state: ReturnType<typeof store.getState>) => state.authReducer);

const navigate=useRouter()

  const dispatch=useDispatch<typeof store.dispatch>()

  const initialValues:{email:string,password:string}={
    email:"",
    password:""
}


const valitdate=Yup.object().shape({
  email:Yup.string().required('Email is required').email(),
  password:Yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)')
})

const formik=useFormik({
initialValues,

onSubmit:(values:{email:string,password:string})=>{
  const load=toast.loading('Loading....')
dispatch(submitLogin(values))
.then(response=>{
  console.log(response)
  toast.dismiss(load)
  if(response?.payload?.data?.message==='success'){
toast.success('Welcome....')
localStorage.setItem('userToken',response?.payload?.data?.token)
navigate.push('/')
  }else{
toast.error(response?.payload?.response?.data?.error)
navigate.push('/login')
  }
})
 
.catch((error=>console.log(error)))
},


validationSchema:valitdate
})
  return (<>

        <Container maxWidth="sm"sx={{marginBlock:3}}  >
        <Paper elevation={10} sx={{p:4}}>

          <Typography sx={{mb:3,color:'#1976D2'}} variant='h6'>Login Now:</Typography>
          <form onSubmit={formik.handleSubmit}>
         <Box>
         <TextField id="email" label="Enter Your Email" variant="outlined" sx={{width:'100%' ,mb:2}} name='email' type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.email&&formik.touched.email?<Alert severity="error" sx={{mb:2}}>{formik.errors.email}</Alert>:null}
         </Box>


         <Box>
         <TextField id="password"label="Enter Your Password" variant="outlined" sx={{width:'100%',mb:2}} name='password' type='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.password&&formik.touched.password?<Alert severity="error" sx={{mb:2}}>{formik.errors.password}</Alert>:null}
         </Box>
          <Button fullWidth  sx={{border:'1px solid #1976D2',':hover':{backgroundColor:'#1976D2',color:'white'}}} type='submit'>Login</Button>
            </form>
        </Paper>
          </Container>
  </>)
}
