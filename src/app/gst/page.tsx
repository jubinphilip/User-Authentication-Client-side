'use client';
import React, { useState } from 'react';
import { useForm } from '@/context/Formcontext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import '../page.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Gstverify() {
  const { formData, updateFormData } = useForm();
  const [gstno, setgstno] = useState(formData.gstno || '');
  const[show,setShow]=useState(false)
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setgstno(e.target.value);
    console.log(gstno)
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const url="http://localhost:9000/user/gstverify"
    axios.post(url,{gstno}).then((res)=>
        {
       
         console.log(res.data)
         if(res.data==true)//if the value of data is true then gst is verified
         {
          toast.success("Gst Verified")
          updateFormData({ gstno });
          setShow(!show)
         }
         else
         {
          toast.error("not Verified")
         }
        })
  };
  const handleNext=()=>
    {
      router.push('/address');
    }
  return (
    <div  className='container'>   
    <ToastContainer position="top-right"/>
      <h1> GST Verification</h1>
      <div className="imageContainer"><Image src="/assets/gst.jpeg" height={150} alt='Adhar Unique Identity' width={150}/></div>
      <form onSubmit={handleSubmit}>
        <label>GST Number:</label>
        <input
          type="text"
          name="gstno"
          value={gstno}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit </button>
      </form>
      {show && <button onClick={handleNext}>Next</button>}
    </div>
  );
}

export default Gstverify;
