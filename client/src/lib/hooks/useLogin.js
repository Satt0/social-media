import { useSelector } from "react-redux";
import {useState,useEffect} from 'react'

export function useLogin(){
    const [isLoggedIn,setLoggedIn]=useState(null)
    const checkLoggedIn=useSelector(state=>state.user.loggedIn)
    useEffect(() => {
            setLoggedIn(checkLoggedIn)
    }, [checkLoggedIn])


    return isLoggedIn
}