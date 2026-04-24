import { PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react'
import MyDocument from './Template';
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className='flex h-screen'>
        <div className='h-full flex-1'>
         <form className="flex flex-col gap-4">
          <input 
            name="firstName"
            placeholder="Imię"
            className="p-2 border"
            onChange={handleChange} 
          />
          <input 
            name="lastName"
            placeholder="Nazwisko"
            className="p-2 border"
            onChange={handleChange} 
          />
          <textarea 
            name="description"
            placeholder="Opis"
            className="p-2 border"
            onChange={handleChange} 
          />
        </form>
        </div>
        <div className='h-full flex-1'>
          <PDFViewer className="w-full h-full border-none">
            <MyDocument data={formData} />
          </PDFViewer>
        </div>
      </div>
    </>
  )
}

export default App
