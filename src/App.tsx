import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex min-h-screen'>
        <div className='h-full flex-1'>
          Sidebard
        </div>
        <div className='h-full flex-1'>
          Content
        </div>
      </div>
    </>
  )
}

export default App
