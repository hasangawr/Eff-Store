import React from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({children}) {
  return (
    <div>
    <main>
      <div className='mt-3 ml-5 mr-5'>
        {children}
      </div>
      <ToastContainer/>
    </main>
  </div>
  )
}

export default MainLayout