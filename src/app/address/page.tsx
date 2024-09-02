'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import '../page.css'
import { useForm } from '../../context/Formcontext'; // Make sure this path is correct
import 'react-toastify/dist/ReactToastify.css';


interface AddressData {
 area: string;
  district: string;
  state: string;
}

function Address() {
  const [pincode, setPincode] = useState('')
  const [addresses, setAddresses] = useState<AddressData[]>([])
  const[show,setShow]=useState(false)
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null)
  const router = useRouter();
  const { updateFormData } = useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const url = "http://localhost:9000/user/addresslookup"
    try {
      const res = await axios.post(url, { pincode });
      setAddresses(res.data);
      console.log(res.data)
      setShow(!show)
      if (res.data.length > 0) {
        setSelectedAddress(res.data[0]);
        console.log(res.data[0])
      }
    } catch (error) {
      console.error("Error fetching address data:", error);
      alert('Failed to fetch address data');
    }
  };

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = addresses.find(addr => addr.area === e.target.value);
    if (selected) {
      setSelectedAddress(selected);
    }
  };

  const handleSaveAddress = () => {
    if (!selectedAddress) {
      alert('Please select an address first');
      return;
    }

    updateFormData({
      address: {
        pincode: pincode,
        area: selectedAddress.area,
        district: selectedAddress.district,
        state: selectedAddress.state
      }
    });

    alert('Address saved successfully');
    router.push('/showdata');
  };

  useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  return (
    <div className='container'>
      <h1>Address</h1>
      <div className="imageContainer"><Image src="/assets/address.png" height={150} alt='address' width={150}/></div>
      <form onSubmit={handleSubmit}>
        <label>Pin Number:</label>
        <input
          type="text"
          name="pincode"
          value={pincode}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      {addresses.length > 0 && (
        <div>
          <label>Place:</label>
          <select name="place" onChange={handleAddressSelect} value={selectedAddress?.area || ''}>
            <option value="">Select an address</option>
            {addresses.map((addr, index) => (
              <option key={index} value={addr.area}>{addr.area}</option>
            ))}
          </select>
        </div>
      )}

      {selectedAddress && (
        <div>
          <h2>Selected Address Details:</h2>
          <p>Office Name: {selectedAddress.area}</p>
          <p>District: {selectedAddress.district}</p>
          <p>State: {selectedAddress.state}</p>
          <button onClick={handleSaveAddress}>Save Address</button>
        </div>
      )}
      {show && <a href="/showdata"><button>next</button></a>}
    </div>
  )
}

export default Address