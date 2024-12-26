'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import {logout} from '../../../lib/authSlice'
import {store} from '../../../lib/store'

import {getUserData} from '../../../lib/UserSlice'
import { useEffect } from 'react';


function Navbar() {
  const pathNmae=usePathname()
  const { userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.authReducer);
  const { userData } = useSelector((state: ReturnType<typeof store.getState>) => state.UserRdeucer);
  console.log(userToken)
const dispatch=useDispatch<typeof store.dispatch>()
const navigate=useRouter()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

useEffect(()=>{
  dispatch(getUserData())
},[userData?.photo])



  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
function logoutProfile(){
  handleCloseUserMenu()
 dispatch(logout())
  navigate.push('/login')
}
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
   
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SocialApp
          </Typography>
{/* mobile verition */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
         
         {userToken !== null
    ? [
        <Button
          key="home"
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          <Link
            href={`/`}
            className={pathNmae === '/' ? 'active' : ''}
          >
            Home
          </Link>
        </Button>,
        <Button
          key="profile"
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          <Link
            href={`/profile`}
            className={pathNmae === '/profile' ? 'active' : ''}
          >
            Profile
          </Link>
        </Button>,
      ]
    : [
        <MenuItem key="login" onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: 'center' }}>
            <Link href={`/login`}>Login</Link>
          </Typography>
        </MenuItem>,
        <MenuItem key="register" onClick={handleCloseUserMenu}>
          <Typography sx={{ textAlign: 'center' }}>
            <Link href={`/register`}>Register</Link>
          </Typography>
        </MenuItem>,
      ]}
               
        
            </Menu>
          </Box>
      
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Social App
          </Typography>

{/* links for lager screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
 
            {userToken!==null?  <>
              <Button
              
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              
            >
           <Link href={`/`} className={pathNmae==='/'?'active':''} > Home</Link>
            </Button>
            <Button
            
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
             
            >
           <Link href={`/profile`}  className={pathNmae==='/profile'?'active':''}> Profile</Link>
            </Button>
            <Button
            
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            
            >
            </Button>
            </>:<><MenuItem  onClick={handleCloseUserMenu}>
                  
                  <Typography sx={{ textAlign: 'center' }}><Link href={`/login`}>Login</Link></Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                
                  <Typography sx={{ textAlign: 'center' }}><Link href={`/register`}>Register</Link></Typography>
                </MenuItem> </>}
     
          </Box>
          <Box sx={{ flexGrow: 0 }}>
        {userToken!==null?  <>
          <Tooltip title="Open settings"> 
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user" src={userData?.photo}/>
              </IconButton> 
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             <MenuItem onClick={logoutProfile}>
             
             <Typography sx={{ textAlign: 'center' }} onClick={logoutProfile}>Logout</Typography>
           </MenuItem>
      
      
            </Menu>
        </>
      
            :null}
              
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
