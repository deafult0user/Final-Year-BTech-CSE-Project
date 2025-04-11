import React from 'react'
// import Header from './_components/Header'
// import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

function DasboardLayout({children}) {
  return (
    <div>
      {/* <Header/> */}
      <div className='mx-auto '>
      {children}
      <Toaster/>
      </div>  
      {/* <Footer/>    */}
    </div>
  )
}

export default DasboardLayout
