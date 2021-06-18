import {useState,useEffect} from 'react'
import colors from 'src/stylesheets/color'
const buttonLight={
    text:colors.textLight,
    background:colors.buttonLight
}
const buttonDark={
    text:colors.textLight,
    background:colors.buttonDark
}
export function useColor(type,mode) {
    const [color,setColor]=useState({text:'',background:''})
   useEffect(() => {
    switch(type) {
        case 'button': setColor(mode==='light'?buttonLight:buttonDark);break;
        default:break;
    }
       
   }, [mode,type])

    return color
}