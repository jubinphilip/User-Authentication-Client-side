'use client';
import React, { useState } from 'react';
import { useForm } from '@/context/Formcontext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../page.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
type BankDetails={
  accno:string,
  ifsc:string
}
function Account() {
  const { formData, updateFormData } = useForm();
  const[show,setShow]=useState(false)
  const [accno, setaccno] = useState(formData.accno || '');
  const [bankdetails,setBankdetails]=useState<BankDetails>({} as BankDetails)
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name=="accno")
    {
    setaccno(e.target.value);
    }
    console.log(accno)
    setBankdetails((prev)=>({...prev,[e.target.name]:e.target.value}));
    console.log(accno)
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    const url="http://localhost:9000/user/verifybank"
    await axios.post(url,bankdetails).then((res)=>
        {
          const{request_id}=res.data
          if(request_id)
          {
            setTimeout(()=>
            {
              getDetails(request_id)
            },10000)
          }
        }) 

    console.log(bankdetails)
  };
  const getDetails=async(id:"string")=>
  {
    console.log(id)
    const url=`http://localhost:9000/user/bankdetails/${id}`
    await axios.get(url).then((res)=>{
      if(res.data.status==1)
      {
        updateFormData({ accno });
        console.log(accno)
        toast.success("Bank Account Verified")
        setShow(!show)
      }
      else
      {
        toast.error("Verification Error")
      }
      toast.success(res.data)
    })
  }
  const handleNext=()=>
    {
      router.push('/gst');
    }
  return (
    <div  className='container'>
      <ToastContainer/>
      <h1>Bank Account Verification</h1>
      <div className="imageContainer"><Image src="/assets/bank.png" height={150} alt='Adhar Unique Identity' width={150}/></div>
      <form onSubmit={handleSubmit}>
        <label>Account Number:</label>
        <input
          type="text"
          name="accno"
          value={bankdetails.accno}
          onChange={handleChange}
        />
         <label>IFSC Code:</label>
        <input
          type="text"
          name="ifsc"
          value={bankdetails.ifsc}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit </button>
      </form>
      {show && <button type="submit" onClick={handleNext}>Next</button>}
    </div>
  );
}

export default Account;
