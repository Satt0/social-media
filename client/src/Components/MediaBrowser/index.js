import React from 'react'
import style from './MediaBrowser.module.scss'
import Post from '../Post';
import MediaViewer from '../MediaViewer'

export default function MediaBrowser({open=false,onClose,post}) {
   
    if(open){
        return (<>
        
         <div  className={style.container}>
                
               <div className={`${style.postWrapper} ${post.media!=="[]"?style.hasMedia:style.noMedia}`}>
               {post?.media!=="[]"&&<div className={style.mediaViewer}>
                <MediaViewer media={JSON.parse(post.media)}/>
                </div>}
                   <Post type="detail" data={post}/>
               </div>
               <div className={style.overlay} onClick={onClose}>hello</div>
            </div>
        </>
           
        )
    }
    return <></>
}
