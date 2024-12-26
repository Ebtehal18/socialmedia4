
'use client';

import React, { ReactNode} from 'react';
import { useRouter,usePathname } from 'next/navigation';  
import { useSelector } from 'react-redux';
import { store } from '@/lib/store';
import Login from '@/app/login/page';
import Register from '@/app/register/page';

export default function ProtectedRoute({ children }: {children:ReactNode}) {
  const { userToken } = useSelector((state: ReturnType<typeof store.getState>) => state.authReducer);
  const router = useRouter();
  const pathname = usePathname();


  const publicRoutes = ['/login', '/register'];

  if (publicRoutes.includes(pathname)) {
    return <>{children}</>;
  }
if (userToken!==null) {
    return children; 
}else{
return <Login />;
}

};






