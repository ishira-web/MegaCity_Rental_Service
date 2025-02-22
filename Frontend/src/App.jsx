import React from 'react'
import Layout from './Pages/Layout'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Login/Register'
import BlogLayout from './Pages/Layout/BlogLayout'
import BookingForm from './Pages/BookingForm'
import Bill from './Pages/Bill'
import AboutLayout from './Pages/Layout/AboutLayout'
import BookingLayout from './Pages/Layout/BookingLayout'
import RideLayout from './Pages/Layout/RideLayout'
import DriverProfile from './Pages/DriverDetails/DriverProfile'
import UserProfile from './Pages/UserProfile'
import AdminHome from './Pages/Admin/AdminHome'
import DriverRegister from './Pages/DriverRegister'
import { AuthProvider } from './Pages/Login/AuthContext'
import PrivateRoute from './Pages/Login/PrivateRoute'
import LoginPage from './Pages/Login/LoginPage'





function App() {
  return (
    <AuthProvider>
   <Routes>
     <Route path='/' element ={<Layout />} />
     <Route path='/ride' element = {<RideLayout/>}/>
     <Route path='/about' element ={<AboutLayout/>}/>
     <Route path='/login' element = {<LoginPage/>}/>
     <Route path='/user-profile' element = {<UserProfile/>}/>
     <Route path='/sign-up' element ={<Register/>}/>
     <Route path='/blog' element = {<BlogLayout/>}/>
     <Route path='/driver-profile' element = {<DriverProfile/>}/>
     <Route path='/booking-form/:id' element={<PrivateRoute><BookingForm/></PrivateRoute>}/>
    <Route path='/booking' element ={<BookingLayout/>}/>
     <Route path= '/bill' element = {<Bill/>}/>
     <Route path='/admin/*' element = {<AdminHome/>}/>
     <Route path='/driver-register' element = {<DriverRegister/>}/>
   </Routes>
   </AuthProvider>
  )
}

export default App