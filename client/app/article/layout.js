import React from 'react'
import { Navbar } from '../component/Header'

const layout = ({children}) => {
  return (
   <div>
         <Navbar />
      {children}
    </div>
  )
}

export default layout
