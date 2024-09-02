'use client'
import axios from 'axios'
import React,{useState} from 'react'
import { useForm } from '@/context/Formcontext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import '../page.css'
function Pancard() {
  const {formData,updateFormData}=useForm();
  const[show,setShow]=useState(false)
  const [panno, setpanno] = useState(formData.panno|| ' ');
  const router=useRouter();
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>
  {
    setpanno(e.target.value)
    console.log(panno)
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const url="http://localhost:9000/user/panverify"
    axios.post(url,{panno}).then((res)=>
        {
         if(res.data.status==1)
         {
          toast(res.data.message)
          setShow(!show)
         }
         else
         {
          toast(res.data.message)
         }
        })
    updateFormData({ panno });
  
  };
  const handleNext=()=> 
    { 
      updateFormData({ panno });
      router.push('/bankacc');
    }
  return (
    <div  className='container'>
         <ToastContainer/>
        <h1>Verify Pancard</h1>
     
        <div className="imageContainer"><Image src="/assets/pan.webp" height={150} alt='Adhar Unique Identity' width={150}/></div>
        <form onSubmit={handleSubmit}>
        <label>Pan Number:</label>
        <input
          type="text"
          name="panno"
          value={panno}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit </button>
      </form>
        {show && <button onClick={handleNext}>Next</button>}
    </div>
  )
}

export default Pancard
