import React,{useState} from 'react'
import style from './MediaBrowser.module.scss'
import Post from '../Post';
import MediaViewer from '../MediaViewer'
import minimize from 'src/stylesheets/svg/minimize.svg'
import {getPostById} from 'src/lib/API/Graphql'
export default function MediaBrowser({open=false,onClose,postid=null}) {
    const [post,setPost]=useState({})
    React.useEffect(()=>{
        if(typeof document){
           if(open){
            document.body.style.overflow = 'hidden';
           }else{
            document.body.style.overflow = '';
           }

        }
    },[open])
    React.useEffect(()=>{
        if(postid>=0){
            getPostById(postid).then(res=>{
                if(res.data){
                    
                        setPost(res.data.getPostInformationById)
                    
                }
            })
        }
        return ()=>{
            document.body.style.overflow = '';
        }
    },[open,postid])
    if(open){
        return (<>
        
         <div  className={style.container}>
              {post.postid&& <div className={`${style.postWrapper} ${post.media!=="[]"?style.hasMedia:style.noMedia}`}>
               {post?.media!=="[]"&&<div className={style.mediaViewer}>
                <button className={style.closeButton} onClick={onClose}>
                    <img src={minimize} alt="exit media"/>
                </button>

                <MediaViewer media={JSON.parse(post.media)}/>
                </div>}
                   <Post type="detail" data={post}/>
               </div>}
            </div>
        </>
           
        )
    }
    return <></>
}
