'use client';
import React, { useState,useEffect } from 'react';
import { useForm } from '@/context/Formcontext';
import { useRouter } from 'next/navigation';
import '../page.css'
import axios from 'axios';
function SummaryPage() {
  const { formData } = useForm();
  const[data,setData]=useState({})
  const router = useRouter();
  useEffect(() => {
    setData(formData);
  }, [formData]);
  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = (e) => 
    {
        e.preventDefault()
         const url="http://localhost:9000/user/submit"
        axios.post(url,data).then((res)=>
            {
              console.log(res.data)
              if(res.data.status==1)
              {
                localStorage.removeItem('formData');//After submittting data to db clearing the localstorage
              }
            })
    }
  return (
    <div  className='container'>
      <h1>Summary</h1>
      <div>
        <h2>Personal Information</h2>
        <p><strong>Username:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>DOB:</strong> {formData.dob}</p>
      </div>
      <div>
        <h2>Other Information</h2>
        <p><strong>Aadhaar Number:</strong> {formData.adhar}</p>
        <p><strong>Pan Number Number:</strong> {formData.panno}</p>
        <p><strong>Account Number:</strong> {formData.accno}</p>
        <p><strong>Gst  Number:</strong> {formData.gstno}</p>
      </div>
      <div>
        <h2>Address</h2>
        <p><strong>PostOffice:</strong> {formData.address?.area}</p>
        <p><strong>District:</strong> {formData.address?.district}</p>
        <p><strong>State:</strong> {formData.address?.state}</p>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SummaryPage;
