'use client'
import React from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {SignUpData} from '../../interfaces/postData'
import { useDispatch } from 'react-redux';
import { submitSignUp } from '@/lib/authSlice';
import { store } from '@/lib/store';
import { Alert, Container } from '@mui/material';
import FormControl from '@mui/material/FormControl';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import toast from 'react-hot-toast'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';





export default function Register() {

 const navigate=useRouter()
  const dispatch=useDispatch<typeof store.dispatch>();
  const initialValues={
    name: "",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""

}
const valitdate=Yup.object().shape({
name:Yup.string().required('Name is required').min(3,'minlegth is 3').max(15,'maxlength is 15'),
email:Yup.string().required('Email is required').email(),
password:Yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)'),
rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'Passwords must match'),
dateOfBirth:Yup.date().max(new Date(Date.now() - 567648000000)).required('Birthday is required'),
gender:Yup.string().required('gender is required')

})



const formik=useFormik({
initialValues,
validationSchema:valitdate,
onSubmit:(values:SignUpData)=>{
  const load=toast.loading('Loading....')
console.log(values)
dispatch(submitSignUp(values))
.then(res=>{
  toast.dismiss(load)
  if (res?.payload?.data?.message==='success'){
    navigate.push('/login')
    toast.success('Welcome...')
  }
})
.catch(err=>{
  toast.dismiss(load)
  toast.error('user already exists.')
  console.log(err)})
}
})

  return <>
     <Container maxWidth="sm"sx={{marginBlock:3}}  >
        <Paper elevation={10} sx={{p:4}}>

          <Typography sx={{mb:3,color:'#1976D2'}} variant='h6'>Sign Up Now:</Typography>
          <form onSubmit={formik.handleSubmit}>
         <Box>
          {/* name */}
         <TextField id="name" label="Enter Your Name" variant="outlined" sx={{width:'100%' ,mb:2}} name='name' type='text'
          value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.name&&formik.touched.name?<Alert severity="error" sx={{mb:2}}>{formik.errors.name}</Alert>:null}
         </Box>

          {/* email */}
         <Box>
         <TextField id="email"label="Enter Your Email" variant="outlined" sx={{width:'100%',mb:2}} name='email' type='email' 
         value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.email&&formik.touched.email?<Alert severity="error" sx={{mb:2}}>{formik.errors.email}</Alert>:null}
         </Box>
         {/* password */}
         <Box>
         <TextField id="password"label="Enter Your Password" variant="outlined" sx={{width:'100%',mb:2}} name='password' type='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.password&&formik.touched.password?<Alert severity="error" sx={{mb:2}}>{formik.errors.password}</Alert>:null}
         </Box>
         {/*  repssword*/}
         <Box>
         <TextField id="rePassword"label="Enter Your rePassword" variant="outlined" sx={{width:'100%',mb:2}} name='rePassword' type='password' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.rePassword&&formik.touched.rePassword?<Alert severity="error" sx={{mb:2}}>{formik.errors.rePassword}</Alert>:null}
         </Box>
         

 {/* Date of Birth */}
 <Box sx={{ width: '100%', mb: 2 }}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Enter Your Birthday"
      value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
      onChange={(newValue) => {
        formik.setFieldValue('dateOfBirth', newValue ? newValue.format('YYYY-MM-DD') : '');
      }}

      name="dateOfBirth"
   
      sx={{width:'100%'}}
    />
  </LocalizationProvider>
  {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
    <Alert severity="error" sx={{ mb: 2 }}>
      {formik.errors.dateOfBirth}
    </Alert>
  ) : null}
</Box>


            {/* Gender */}
            <Box sx={{ width: '100%', my: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Gender"
                >
      
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.gender && formik.touched.gender ? (
                <Alert severity="error" sx={{ m: 2 }}>
                  {formik.errors.gender}
                </Alert>
              ) : null}
            </Box>

          <Button fullWidth  sx={{border:'1px solid #1976D2',':hover':{backgroundColor:'#1976D2',color:'white'}}} type='submit'>Sign UP</Button>
            </form>
        </Paper>
          </Container>
  </>
}
