import { PDFViewer } from '@react-pdf/renderer'
import { useState, useEffect, useMemo, memo, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import MyDocument from './Template'
import MyDocument2 from './Template2'

import "./i18n"
import './App.css'

interface FormData {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  skills: string;
  languages: string;
  certificates: string;
  experience: string;
  experienceTitle: string;
  experienceDate: string;
  education: string;
  educationTitle: string;
  educationDate: string;
}

interface MemoizedPDFProps {
  Template: React.ComponentType<{ data: FormData & { photo: string }, t: (key: string) => string }>;
  data: FormData & { photo: string };
  t: (key: string) => string;
}

const MemoizedPDF = memo(({ Template, data, t }: MemoizedPDFProps) => {
  if (!Template) return null;
  
  return (
    <PDFViewer className="w-full h-full border-none">
      <Template data={data} t={t} />
    </PDFViewer>
  )
})

MemoizedPDF.displayName = 'MemoizedPDF';

function App() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language) {
      document.documentElement.lang = i18n.language
    }
  }, [i18n.language])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const templates = {
    classic: MyDocument,
    modern: MyDocument2
  }

  const [activeTemplate, setActiveTemplate] = useState<keyof typeof templates>('classic')

  const [formData, setFormData] = useState<FormData>(() => {
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

  // Poprawka: Bezpieczna inicjalizacja obrazu - czyścimy śmieci typu "zdjecie" z pamięci podręcznej
  const [photo, setPhoto] = useState<string>(() => {
    const savedPhoto = sessionStorage.getItem('photo') || ''
    if (savedPhoto && (savedPhoto.startsWith('data:image/') || savedPhoto.startsWith('blob:'))) {
      return savedPhoto
    }
    return ''
  })

  const [commitData, setCommitData] = useState(() => ({ ...formData, photo }))

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    if (photo && (photo.startsWith('data:image/') || photo.startsWith('blob:'))) {
      try {
        sessionStorage.setItem('photo', photo)
      } catch {
        // Zabezpieczenie przed przepełnieniem pamięci
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
  
    const img = new Image()
    const url = URL.createObjectURL(file)
  
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX = 400
      let w = img.width
      let h = img.height
  
      if (w > h) {
        h = Math.round((h * MAX) / w)
        w = MAX
      } else {
        w = Math.round((w * MAX) / h)
        h = MAX
      }
  
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h)
        const compressed = canvas.toDataURL('image/jpeg', 0.7)
        setPhoto(compressed)
      }
      
      URL.revokeObjectURL(url)
    }
  
    img.src = url
  }

  const handleReset = () => {
    const empty: FormData = {
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
    setPhoto('')
    setCommitData({ ...empty, photo: '' })
    sessionStorage.removeItem('photo')
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
            type="button"
            onClick={() => changeLanguage('pl')}
            style={{ fontWeight: i18n.language === 'pl' ? 'bold' : 'normal' }}
          >
            PL
          </button>
          <button
            type="button"
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
              type="button"
              onClick={() => setActiveTemplate(key as keyof typeof templates)}
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

            <div className="flex flex-col gap-1">
              <input type="file" accept="image/*" onChange={handlePhoto} className="p-2 border" />
              {photo && (photo.startsWith('data:image/') || photo.startsWith('blob:')) && (
                <div className="flex items-center gap-3">
                  <img src={photo} alt="Preview" className="w-12 h-12 object-cover border" />
                  <button type="button" onClick={() => setPhoto('')} className="p-2 bg-red-500 text-white rounded">Usuń</button>
                </div>
              )}
            </div>

            <input name="firstName" value={formData.firstName || ''} placeholder={t('firstName')} onChange={handleChange} className="p-2 border" />
            <input name="lastName" value={formData.lastName || ''} placeholder={t('lastName')} onChange={handleChange} className="p-2 border" />
            <input name="title" value={formData.title || ''} placeholder={t('title')} onChange={handleChange} className="p-2 border" />

            <input name="email" value={formData.email || ''} placeholder={t('email')} onChange={handleChange} className="p-2 border" />
            <input name="phone" value={formData.phone || ''} placeholder={t('phone')} onChange={handleChange} className="p-2 border" />
            <input name="address" value={formData.address || ''} placeholder={t('address')} onChange={handleChange} className="p-2 border" />

            <textarea name="skills" value={formData.skills || ''} placeholder={t('skills')} onChange={handleChange} className="p-2 border" />
            <textarea name="languages" value={formData.languages || ''} placeholder={t('languages')} onChange={handleChange} className="p-2 border" />
            <textarea name="certificates" value={formData.certificates || ''} placeholder={t('certificates')} onChange={handleChange} className="p-2 border" />

            <textarea name="description" value={formData.description || ''} placeholder={t('description')} onChange={handleChange} className="p-2 border" />

            <input name="experienceTitle" value={formData.experienceTitle || ''} placeholder={t('experienceTitle')} onChange={handleChange} className="p-2 border" />
            <input name="experienceDate" value={formData.experienceDate || ''} placeholder={t('experienceDate')} onChange={handleChange} className="p-2 border" />
            <textarea name="experience" value={formData.experience || ''} placeholder={t('experience')} onChange={handleChange} className="p-2 border" />

            <input name="educationTitle" value={formData.educationTitle || ''} placeholder={t('educationTitle')} onChange={handleChange} className="p-2 border" />
            <input name="educationDate" value={formData.educationDate || ''} placeholder={t('educationDate')} onChange={handleChange} className="p-2 border" />
            <textarea name="education" value={formData.education || ''} placeholder={t('education')} onChange={handleChange} className="p-2 border" />

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
          <MemoizedPDF Template={ActiveTemplate} data={commitData} t={t} />
        </div>

      </div>

    </div>
  )
}

export default App