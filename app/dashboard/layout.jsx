import React from 'react'
import Header from './_components/Header'

function DasboardLayout({children}) {
  return (
    <div>
      <div className='mx-5 md:mx-20 lg:mx-36 '>
      {children}
      </div>     
    </div>
  )
}

export default DasboardLayout
