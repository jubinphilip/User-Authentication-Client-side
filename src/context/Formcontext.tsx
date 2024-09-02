'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Formdata {
  name: string;
  email: string;
  phone: string;
  dob: string;
  adhar: string;
  panno: string;
  accno: string;
  gstno: string;
  address: {
    pincode: string;
    area: string;
    district: string;
    state: string;
  };
}

interface FormcontextType {
  formData: Formdata;
  updateFormData: (newData: Partial<Formdata>) => void;
}

const FormContext = createContext<FormcontextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Formdata>({} as Formdata);

  // Load data from localStorage on the client side only
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const updateFormData = (newData: Partial<Formdata>) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      localStorage.setItem('formData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
