import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated , user ,children}) {
  const location = useLocation()

  // if use is not authenticated then redirect the user to login
  if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
    return <Navigate to={'/auth/login'} />
  }
  //if user is authenticated then redirect the user's role is admin redirect to admin dashboard or if user's role is not admin redirect to shoppin dashdoard

  if(isAuthenticated && (location.pathname.includes('/login')|| location.pathname.includes('/register'))){
        console.log(user ,"checkauth");
      if(user?.role === 'admin'){
        
        return <Navigate to={'/admin/dashboard'} />
      }else {
        return <Navigate to={'/shop/home'} />
      }
    } 

   // if user try to reach to admin page
  if(isAuthenticated && user?.role !== 'admin' &&  location.pathname.includes('admin')){
    return <Navigate to={'/unauthpage'} />}

  //if the admin try to reaches shops page
  if(isAuthenticated && user?.role == 'admin' && location.pathname.includes('shop')){
    return <Navigate to={'/admin/dashboard'} />}
  console.log(location.pathname);
  
  
  return (
    <div className=''>{children}</div>
  )
}

export default CheckAuth