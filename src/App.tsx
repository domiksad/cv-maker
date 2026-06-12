import { PDFViewer } from '@react-pdf/renderer'
import { useState, useEffect, useMemo, memo } from 'react'
import { useTranslation } from 'react-i18next'

import MyDocument from './Template'
import MyDocument2 from './Template2'

import "./i18n"
import './App.css'

const MemoizedPDF = memo(({ Template, data }: any) => {
  return (
    <PDFViewer className="w-full h-full border-none">
      <Template data={data} />
    </PDFViewer>
  )
})

function App() {

  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const templates = {
    classic: MyDocument,
    modern: MyDocument2
  }

  const [activeTemplate, setActiveTemplate] = useState('classic')

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
      experienceTitle: '',
      experienceDate: '',
      education: '',
      educationTitle: '',
      educationDate: ''
    }
  })

  const [photo, setPhoto] = useState(() => {
    return sessionStorage.getItem('photo') || ''
  })

  const [commitData, setCommitData] = useState({ ...formData, photo })

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (photo) {
      try {
        sessionStorage.setItem('photo', photo)
      } catch {
      }
    } else {
      sessionStorage.removeItem('photo')
    }
  }, [photo])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCommitData({ ...formData, photo })
    }, 600)
    return () => clearTimeout(timer)
  }, [formData, photo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
  
    const img = new window.Image()
    const url = URL.createObjectURL(file)
  
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX = 400
      let w = img.width
      let h = img.height
  
      if (w > h) {
        h = Math.round(h * MAX / w)
        w = MAX
      } else {
        w = Math.round(w * MAX / h)
        h = MAX
      }
  
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)
  
      const compressed = canvas.toDataURL('image/jpeg', 0.7)
      URL.revokeObjectURL(url)
      setPhoto(compressed)
    }
  
    img.src = url
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
      experienceTitle: '',
      experienceDate: '',
      education: '',
      educationTitle: '',
      educationDate: ''
    }
    setFormData(empty)
    setCommitData({ ...empty, photo: '' })
    setPhoto('')
  }

  const ActiveTemplate = useMemo(() => {
    return templates[activeTemplate]
  }, [activeTemplate])

  return (
    <div className='flex h-screen flex-col'>

      {/* TOP BAR */}
      <div className="p-4 flex justify-between items-center border-b">

        <div className="flex gap-4">
          <button
            onClick={() => changeLanguage('pl')}
            style={{ fontWeight: i18n.language === 'pl' ? 'bold' : 'normal' }}
          >
            PL
          </button>
          <button
            onClick={() => changeLanguage('en')}
            style={{ fontWeight: i18n.language === 'en' ? 'bold' : 'normal' }}
          >
            EN
          </button>
        </div>

        <div className="flex gap-4">
          {Object.keys(templates).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTemplate(key)}
              style={{ fontWeight: activeTemplate === key ? 'bold' : 'normal' }}
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

            <input type="file" accept="image/*" onChange={handlePhoto} className="p-2 border" />

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

            <input name="experienceTitle" value={formData.experienceTitle} placeholder={t('experienceTitle') || 'Nazwa stanowiska'} onChange={handleChange} className="p-2 border" />
            <input name="experienceDate" value={formData.experienceDate} placeholder={t('experienceDate') || 'Okres zatrudnienia'} onChange={handleChange} className="p-2 border" />
            <textarea name="experience" value={formData.experience} placeholder={t('experience')} onChange={handleChange} className="p-2 border" />

            <input name="educationTitle" value={formData.educationTitle} placeholder={t('educationTitle') || 'Nazwa szkoły'} onChange={handleChange} className="p-2 border" />
            <input name="educationDate" value={formData.educationDate} placeholder={t('educationDate') || 'Okres nauki'} onChange={handleChange} className="p-2 border" />
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
          <MemoizedPDF Template={ActiveTemplate} data={commitData} />
        </div>

      </div>

    </div>
  )
}

export default App