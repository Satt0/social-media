import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import theme from 'src/stylesheets/color'

export function useTheme(){
    const index=useSelector(state=>state.settings.theme)
    

    return theme[index]


}