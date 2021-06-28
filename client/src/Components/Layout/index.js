
import React from 'react'
import Navbar from 'src/Components/Navbar'
import { useTheme } from 'src/lib/hooks/useColor'

import { useSelector } from 'react-redux'
export default function Layout({children}) {
    const userid=useSelector(state=>state.user.uid)
    const theme=useTheme()
    const style={
        backgroundColor:theme.background,
        paddingBottom:'10vh',
        backgroundImage:`url("${theme.backgroundImage}")`,
        backgroundPosition:"left top",
        backgroundSize:"cover",
        backgroundAttachment:"fixed",
        minHeight:"100vh"
    }
    return (
        <div style={style}>

            <Navbar userid={userid}/>
            {children}
        </div>
    )
}
