import CommonForm from '@/components/CommonForm'
import { loginFormControls } from '@/config/regsiterFormControlls'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '@/store/AuthSlice'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  email : "",
  password : ''
}

function Login() {
  const [formData , setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(login(formData))
    .then((data) => {
         console.log("data" ,data)
        if (data?.payload?.success) {
          toast({
            title : data?.payload?.message
          })
        }else {
          console.log(data?.payload);
          
          toast({
            title : data?.payload || "Something went wrong while logging !",
            veriant : "destructive"
          })
        }
      })
    

    
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