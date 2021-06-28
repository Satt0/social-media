import React,{useState,useRef,useEffect} from 'react'
import styles from './SearchBox.module.scss'
// icon
import close from 'src/stylesheets/svg/close.svg'

import search from 'src/stylesheets/svg/search.svg'
// material ui
import {Drawer} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from 'src/lib/hooks/useColor'

const SearchBox=()=>{
    const isMobile=useMediaQuery("(max-width:700px)")
    const [isShown,setState]=useState(true)
    const [searchDrawer,setSearchDrawer]=useState(false)
    const theme=useTheme()
    return (<>
    <OverlaySearch isOpen={searchDrawer} setOpen={setSearchDrawer}/>
    <form className={styles.searchBox} style={{backgroundColor:isMobile?"transparent":''}}>
        
        <div style={{display:isShown?'':'none'}}><img 
        onClick={()=>{
            if(isMobile){
                setSearchDrawer(true)
            }
        }}
        
        alt="icon" title="Search" width={isMobile?"32":'23'} src={search}/></div>
    <input style={{color:theme.text,display:isMobile?'none':''}} placeholder="Search Anything!" onFocus={()=>{setState(false)}}  onBlur={()=>{setState(true)}} type="text"/>
    </form>
    </>)
}
const OverlaySearch=({isOpen,setOpen})=>{
    const inputRef=useRef(null)
    useEffect(()=>{
       if(inputRef?.current){
        inputRef.current.focus()
       }
    },[inputRef])
    return <React.Fragment>
    
    <Drawer anchor={"top"} open={isOpen} onClose={()=>{setOpen(false)}}>
        <p className={styles.searchTitle}>Search anything!</p>
        <div className={styles.overlaySearch}>
        <div><img alt="icon" title="Search" src={search}/></div>
            <input ref={inputRef} type="text"/>
            <div><img onClick={()=>{setOpen(false)}} alt="icon" title="Search" src={close}/></div>
        </div>
    </Drawer>
  </React.Fragment>
    
}

export {
    SearchBox
}