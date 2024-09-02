'use client';
import React, { useState } from 'react';
import { useForm } from '@/context/Formcontext';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../page.css'
function AdharPage() {
  const { formData, updateFormData } = useForm();
  const[show,setShow]=useState(false)
  const [adhar, setadhar] = useState(formData.adhar || '');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setadhar(e.target.value);
    console.log(adhar)
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const url="http://localhost:9000/user/adharverify"
    axios.post(url,{adhar}).then((res)=>
        {
        const {data}=res.data
        //console.log(res.data)
        //console.log(data)
        if(data==true)
        {
          toast.success("Adhar Verified")
          setShow(!show)
        }
        else
        {
          toast.error("Adhar Not Verified")
        }
         
        })
    updateFormData({ adhar });
 
 
  };
  const handleNext=()=>
    {
      updateFormData({ adhar });
      router.push('/pancard');
    }

  return (
   
    <div  className='container'>
       <ToastContainer/>
      <h1>Aadhaar Verification</h1>
      <div className='imageContainer'>
      <Image src="/assets/adhar.png" height={100} alt='Adhar Unique Identity' width={100}/>
      </div>
    
      <form onSubmit={handleSubmit}>
        <label>Aadhaar Number:</label>
        <input
          type="text"
          name="adhar"
          value={adhar}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {show && <button onClick={handleNext}>Next</button>}
    </div>
    
  );
}

export default AdharPage;
