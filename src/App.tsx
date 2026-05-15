import { PDFViewer } from '@react-pdf/renderer'
import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import MyDocument from './Template'
import MyDocument2 from './Template2'

import "./i18n"
import './App.css'

function App() {

  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  // TEMPLATES
  const templates = {
    classic: MyDocument,
    modern: MyDocument2
  }

  const [activeTemplate, setActiveTemplate] = useState('classic')

  // FORM DATA
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData')
    return saved ? JSON.parse(saved) : {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      skills: '',
      languages: '',
      certificates: '',
      experience: '',
      education: ''
    }
  })

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [formData])

  // SNAPSHOT (fix flicker)
  const [commitData, setCommitData] = useState(formData)

  useEffect(() => {
    const t = setTimeout(() => {
      setCommitData(formData)
    }, 600)

    return () => clearTimeout(t)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReset = () => {
    const empty = {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      description: '',
      skills: '',
      languages: '',
      certificates: '',
      experience: '',
      education: ''
    }

    setFormData(empty)
    setCommitData(empty)
  }

  const ActiveTemplate = useMemo(() => {
    return templates[activeTemplate]
  }, [activeTemplate])

  const PDFPreview = ({ Template, data }) => {
    return (
      <PDFViewer className="w-full h-full border-none">
        <Template data={data} />
      </PDFViewer>
    )
  }

  const MemoPDF = useMemo(() => {
    return (
      <PDFPreview
        Template={ActiveTemplate}
        data={commitData}
      />
    )
  }, [ActiveTemplate, commitData])

  return (
    <div className='flex h-screen flex-col'>

      {/* TOP BAR */}
      <div className="p-4 flex justify-between items-center border-b">

        {/* LEFT - LANGUAGE */}
        <div className="flex gap-4">

          <button
            onClick={() => changeLanguage('pl')}
            style={{
              fontWeight: i18n.language === 'pl' ? 'bold' : 'normal'
            }}
          >
            PL
          </button>

          <button
            onClick={() => changeLanguage('en')}
            style={{
              fontWeight: i18n.language === 'en' ? 'bold' : 'normal'
            }}
          >
            EN
          </button>

        </div>

        {/* RIGHT - TEMPLATES */}
        <div className="flex gap-4">

          {Object.keys(templates).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTemplate(key)}
              style={{
                fontWeight: activeTemplate === key ? 'bold' : 'normal'
              }}
            >
              {key}
            </button>
          ))}

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className='flex flex-1'>

        {/* LEFT FORM */}
        <div className='flex-1 overflow-auto p-4'>

          <form className="flex flex-col gap-4">

            <input name="firstName" value={formData.firstName} placeholder={t('firstName')} onChange={handleChange} className="p-2 border" />
            <input name="lastName" value={formData.lastName} placeholder={t('lastName')} onChange={handleChange} className="p-2 border" />
            <input name="title" value={formData.title} placeholder={t('title')} onChange={handleChange} className="p-2 border" />

            <input name="email" value={formData.email} placeholder={t('email')} onChange={handleChange} className="p-2 border" />
            <input name="phone" value={formData.phone} placeholder={t('phone')} onChange={handleChange} className="p-2 border" />
            <input name="address" value={formData.address} placeholder={t('address')} onChange={handleChange} className="p-2 border" />

            <input name="skills" value={formData.skills} placeholder={t('skills')} onChange={handleChange} className="p-2 border" />
            <input name="languages" value={formData.languages} placeholder={t('languages')} onChange={handleChange} className="p-2 border" />
            <input name="certificates" value={formData.certificates} placeholder={t('certificates')} onChange={handleChange} className="p-2 border" />

            <textarea name="description" value={formData.description} placeholder={t('description')} onChange={handleChange} className="p-2 border" />
            <textarea name="experience" value={formData.experience} placeholder={t('experience')} onChange={handleChange} className="p-2 border" />
            <textarea name="education" value={formData.education} placeholder={t('education')} onChange={handleChange} className="p-2 border" />

            <button
              type="button"
              onClick={handleReset}
              className="p-2 bg-red-500 text-white rounded"
            >
              Reset
            </button>

          </form>

        </div>

        {/* RIGHT PREVIEW */}
        <div className='flex-1'>

          {MemoPDF}

        </div>

      </div>

    </div>
  )
}

export default App