'use client'
import React, { ReactNode } from 'react';

import Navbar from "./_components/navbar/page";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import "./globals.css";
import theme from "./../theme";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from './_components/protectroutes/page';

export default function RootLayout({children}:{children:ReactNode}) {
  return <>
      <html lang="en">
        <head>
          <title>social app</title>
          
        </head>
      <body>
      <Provider store={store}>
      <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
           <Navbar/>

           <ProtectedRoute>{children}</ProtectedRoute>

           <Toaster />
     
          </ThemeProvider>
     
          </AppRouterCacheProvider>
</Provider>
   

      </body>
    </html>

  </>

}
