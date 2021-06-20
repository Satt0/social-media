import {useState} from 'react'


export function useMedia(){
    const [files,addFile]=useState([])
    const appendFile=function(e){
        for ( let file of e.target.files){
            addFile((state)=>([...state,file]))
        }
    }
    return [files,appendFile,addFile]
}