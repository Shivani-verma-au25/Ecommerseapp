import CommonForm from '@/components/CommonForm'
import { loginFormControls } from '@/config/regsiterFormControlls'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  email : "",
  password : ''
}

function Login() {
  const [formData , setFormData] = useState(initialState)

  const onSubmit = () => {
    
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6 '>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground '>Create new Account</h1>
        <p className='mt-2 '>If you don't have account </p>
        <Link to={'/auth/register'}  className='font-medium text-primary hover:underline ml-2 '>Register</Link>
      </div>

      <CommonForm  formControl={loginFormControls}
        buttonText = {'LogIn'}
        formData={formData}
        setFormData={setFormData}
        onSubmit= {onSubmit}
       />
    </div>
  )
}

export default Login