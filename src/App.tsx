import { PDFViewer } from '@react-pdf/renderer';
import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import MyDocument from './Template';
import "./i18n"
import './App.css'

function App() {
  // LANGUAGE
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // LOCAL STORAGE  
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      firstName: '',
      lastName: '',
      description: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // DEBOUNCE + MEMOIZATION
  const [debouncedData, setDebouncedData] = useState(formData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData(formData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [formData]);

  const memoizedDocument = useMemo(() => (
    <MyDocument data={debouncedData} />
  ), [debouncedData]);

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      firstName: '',
      lastName: '',
      description: ''
    });
  }; 

  return (
    <>
      <div className="p-4 flex gap-2">
        <button onClick={() => changeLanguage('pl')}>PL</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
      </div>
      <div className='flex h-screen'>
        <div className='h-full flex-1'>
         <form className="flex flex-col gap-4">
          <input 
            name="firstName"
            value={formData.firstName}
            placeholder={t('firstName')}
            className="p-2 border"
            onChange={handleChange} 
          />
          <input 
            name="lastName"
            value={formData.lastName}
            placeholder={t('lastName')}
            className="p-2 border"
            onChange={handleChange} 
          />
          <textarea 
            name="description"
            value={formData.description}
            placeholder={t('description')}
            className="p-2 border"
            onChange={handleChange} 
          />
          <button 
            type="button" 
            onClick={handleReset} 
            className="p-2 bg-red-500 text-white rounded select-none">
              Reset
          </button>
        </form>
        </div>
        <div className='h-full flex-1 select-none'>
          <PDFViewer className="w-full h-full border-none">
            {memoizedDocument}
          </PDFViewer>
        </div>
      </div>
    </>
  )
}

export default App
