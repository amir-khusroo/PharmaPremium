import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StickyNavbar from './component/Navbar'
import Home from './component/home/Home'
import Login from './component/Login'
import SignUp from './component/SignUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './component/ForgotPassword'
import  Dashboard  from './component/Dashboard'
import PaymentSuccess from './component/patientDashboard/PaymentSuccess'
import PaymentForm from './component/patientDashboard/PaymentForm'


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <StickyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-form" element={<PaymentForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
