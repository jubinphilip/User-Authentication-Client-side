'use client'
import React, { useState,useEffect } from 'react'
import { useForm } from '@/context/Formcontext'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './globals.css'
type UserRecord = {
  username: string;
  email: string;
  phone: string;
  adhar: string;
  dob: string;
}
function Page() {
  const{formData,updateFormData}=useForm();
  const[otp,setOtp]=useState({})
  const[record,setRecord]=useState<UserRecord>({} as UserRecord)
  const[show,setShow]=useState(false)
  const[mobValidate,setmobileValidate]=useState(false)
  const[emailValidate,setEmailvalidate]=useState(false)
  const router=useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>)
  {
      setRecord((prev)=>({...prev,[e.target.name]:e.target.value}))
      console.log(record)
  }
  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = (e) => 
  {
      e.preventDefault()
       const url="http://localhost:9000/user/register"
      axios.post(url,record).then((res)=>
          {
            toast.success(res.data.message)
            console.log(res.data.message)
          }) 
  
     console.log(record)
     setShow(!show)
  }
  const handleNext=()=>
  {
    updateFormData(record);
    router.push('/adhar');
  }
  function handleotpChange(e: React.ChangeEvent<HTMLInputElement>)
  {
    setOtp((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleEmailotp: React.FormEventHandler<HTMLButtonElement> = (e) => 
  {
    e.preventDefault()
    const url="http://localhost:9000/user/otpemail"
    const verifymail=record.email;
    console.log(verifymail,otp)
    axios.post(url,{verifymail,otp}).then((res)=>
        {
          toast.success(res.data.message)
        setEmailvalidate(res.data.status)
        }) 

   console.log(otp)
  }
  const handleOtpsubmit: React.FormEventHandler<HTMLButtonElement> = (e) => 
  {
    e.preventDefault()
    const url="http://localhost:9000/user/otpverify"
    axios.post(url,otp).then((res)=>
        {
          toast.success(res.data.message)
          setmobileValidate(res.data.status)
        }) 

   console.log(otp)
  }
  return (
    <div className='container'>
       <ToastContainer/>
        <form >
        <h1 className='head'>Register Here </h1>
        
        <input type="text" name="name" placeholder='Enter  Name' onChange={handleChange} />
        <br/>
        <input placeholder='Enter Your Email' type="email" name="email" onChange={handleChange}/>{show &&<div><input placeholder='enter OTP ' className='otpbox' name='otp' onChange={handleotpChange}/><button className='otpbtn' onClick={handleEmailotp}>Submit Otp</button></div>}
        <br/>
        <input placeholder='Enter Conatct Number' type="text" name="phone" onChange={handleChange}/>{show &&<div><input placeholder='enter OTP ' className='otpbox' name='otp' onChange={handleotpChange}/><button className='otpbtn'  onClick={handleOtpsubmit}>Submit Otp</button></div>}

        <br/>
        <input type="date" name="dob" onChange={handleChange}/>
        <br/>
        <button type='submit' onClick={handleSubmit}>Submit Data</button><br/>
        
      </form>
      {mobValidate && emailValidate && <button onClick={handleNext}>Next</button>}
    </div>
  )
}
 
export default Page
