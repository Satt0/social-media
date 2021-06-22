
import React from 'react'
import Navbar from 'src/Components/Navbar'
export default function Layout({children}) {
    return (
        <div>
            
            <Navbar/>
            {children}
        </div>
    )
}
