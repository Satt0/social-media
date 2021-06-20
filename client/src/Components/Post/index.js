import React from 'react'
import styles from './Post.module.scss'
import Avatar from '../Avatar'
import like from 'src/stylesheets/svg/reaction.svg'
import avatar from 'src/Components/Avatar/avatar.jpg'
import { getImageURL } from 'src/lib/Ultilities/getURL'
import API from 'src/lib/API/UserAPI'
export default function Post({data}) {
    const [post,setPost]=React.useState(null)
    
    React.useEffect(()=>{
        if(data){
            setPost(state=>({...state,...data,media:JSON.parse(data.media)}))
        }
    },[data])
    React.useEffect(()=>{
        
            if(post?.userid){
                API.getUserById(post.userid).then(res=>{
                    setPost(state=>({...state,...res.rows[0]}))
                })
            }
        
    },[post])
    if(post){
        
        return (
            <div className={styles.container} tabIndex="1">
                   {/* user infor */}
                   <div className={styles.userInfor}>
                       <Avatar userAvatar={avatar} size="medium"/>
                       {/* user name and date created */}
                       <div className={styles.postInfor}>
                            <p>{post?.userfullname || ""}</p>
                            <p>{data.datecreated}</p>
                       </div>
                       </div> 
    
                       {/* post */}
                       <div className={styles.postContent}>
                        <p>{data.content}</p>
                        {post?.media?.length?<div className={styles.postMedia} style={{backgroundImage:`url("${getImageURL(post.media[0])}")`}}></div>:<></>}
                       </div>
                       {/* likes and comments */}
                       <div className={styles.like_comment}>
                       <Avatar userAvatar={like}/>
                       <div></div>
                        <p>{data.commentcount} comments</p>
    
                       </div>
            </div>
        )
    }
    return <></>
}
