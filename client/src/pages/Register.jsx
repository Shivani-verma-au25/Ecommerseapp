import CommonForm from '@/components/CommonForm'
import { registerFormControls } from '@/config/regsiterFormControlls'
import { useToast } from '@/hooks/use-toast'
import { register } from '@/store/AuthSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  username :'',
  email : "",
  password : ''
}

function Register() {
  const [formData , setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {toast} = useToast()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(register (formData))
    .then((data)=> {
        // console.log('Response Data:', data) // Check the structure here
        if (data?.payload?.success ) {
        toast({
          title:data?.payload?.message ,
        })
      navigate('/auth/login')
      }else {
            // console.error(data?.payload); // Check if this logs the expected message
        toast({
          title: data?.payload || "An error occurred during registration",
          variant: "destructive",
        });
      }
      
        
    })
    
}



  console.log( "ffomr", formData);

  return (
    <div className='mx-auto w-full max-w-md space-y-6 '>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground '>Create new Account</h1>
        <p className='mt-2 '>Already have an account</p>
        <Link to={'/auth/login'}  className='font-medium text-primary hover:underline ml-2 '>Login</Link>
      </div>

      <CommonForm  formControl={registerFormControls}
        buttonText = {'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit= {onSubmit}
       />
    </div>
  )
}

export default Register