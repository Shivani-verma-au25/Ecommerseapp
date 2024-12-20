import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/auth/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminViewLayout from './components/adminview/AdminViewLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import AdminFeatures from './pages/AdminFeatures'
import ShoppingLayout from './components/shoppingView/ShoppingLayout'
import NotFound from './pages/NotFound'
import ShoppingHome from './pages/ShoppingHome'
import ShoppingCheckOut from './pages/ShoppingCheckOut'
import ShoppingAccount from './pages/ShoppingAccount'
import ShoppingList from './pages/ShoppingList'
import CheckAuth from './components/commonComponent/CheckAuth'
import Unauthpage from './pages/Unauthpage'
import { useDispatch, useSelector } from 'react-redux'
import { checkauth } from './store/AuthSlice'
import { Skeleton } from "@/components/ui/skeleton"



function App() {
    const { isAuthenticated ,user ,isLoading} = useSelector(state => state.auth)
    // console.log({isAuthenticated , user});
    const  dispatch = useDispatch()

    useEffect(() =>{
      dispatch(checkauth())
    }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[800px] bg-black h-[600px] rounded" />

  }  

  console.log(isLoading , user);
  


    

  return (
    <div className='flex flex-col overflow-hidden  bg-white'>
      
      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>
        } >
          <Route path='register'  element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AdminViewLayout />
          </CheckAuth>
        } >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element ={<AdminFeatures />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout />
          </CheckAuth>
        } >
          <Route path='home' element={<ShoppingHome />} />
          <Route path='checkout' element={<ShoppingCheckOut />} />
          <Route path='listing' element={<ShoppingList /> } />
          <Route path='account' element={<ShoppingAccount /> } />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/unauthpage' element={<Unauthpage />} />
      </Routes>
    </div>
  )
}

export default App