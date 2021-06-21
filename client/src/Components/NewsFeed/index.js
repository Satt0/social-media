import React,{useState,useEffect} from 'react'
import Post from 'src/Components/Post'
import MediaBrowser from '../MediaBrowser'
export default function NewsFeed({posts}) {
    const [open,setOpen]=useState(false)
    const [currentPost,setCurrent]=useState(null)
    const openBrowser=(index)=>{
       return ()=>{
        setOpen(true)
        setCurrent(posts[index])
       }
    }
    if(posts?.length>0){
        return (
            <div>
                <MediaBrowser open={open} post={currentPost} onClose={()=>{setOpen(false)}}/>
               {posts.map((data,index)=><Post onOpen={openBrowser(index)} key={'post-id-'+index} data={data}/>)}
                
            </div>
        )
    }
    return <></>
}
