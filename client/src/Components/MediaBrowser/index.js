import React from 'react'
import style from './MediaBrowser.module.scss'
import Post from '../Post';
import MediaViewer from '../MediaViewer'
import minimize from 'src/stylesheets/svg/minimize.svg'
export default function MediaBrowser({open=false,onClose,post}) {
   
    React.useEffect(()=>{
        if(typeof document){
           if(open){
            document.body.style.overflow = 'hidden';
           }else{
            document.body.style.overflow = '';
           }

        }
    })

    if(open&&post?.postid){
        return (<>
        
         <div  className={style.container}>
               <div className={`${style.postWrapper} ${post.media!=="[]"?style.hasMedia:style.noMedia}`}>
               {post?.media!=="[]"&&<div className={style.mediaViewer}>
                <button className={style.closeButton} onClick={onClose}>
                    <img src={minimize} alt="exit media"/>
                </button>

                <MediaViewer media={JSON.parse(post.media)}/>
                </div>}
                   <Post type="detail" data={post}/>
               </div>
               {/* <div className={style.overlay} onClick={onClose}></div> */}
            </div>
        </>
           
        )
    }
    return <></>
}
