import React,{useState} from 'react'
import styles from './Post.module.scss'
import Avatar from '../Avatar'
import like from 'src/stylesheets/svg/reaction.svg'
import { getImageURL } from 'src/lib/Ultilities/getURL'
import API from 'src/lib/API/UserAPI'
import { Link } from 'react-router-dom'
import PreviewMedia from '../PreviewMedia'
export default function Post({data,onOpen,type="minimal"}) {
    const [seemore,setSeemore]=useState(false)
    const [post,setPost]=React.useState(null)
    React.useEffect(()=>{
        if(data){
            setPost(state=>({...state,...data,media:JSON.parse(data.media)}))
        }
    },[data])
    React.useEffect(()=>{
        
            if(post?.userid && !post?.userfullname){
                API.getUserById(post.userid).then(res=>{
                    setPost(state=>({...state,...res.rows[0]}))
                    console.log(res);
                })
            }
        
    },[post])
    if(post){
        
        return (
            <>
           
           
                    
            <div className={styles.container} tabIndex="1">
                   {/* user infor */}
                   
                   <div className={styles.userInfor}>
                   <Link to={`/user/${post?.userid}`}>
                       <Avatar userAvatar={post.picture??null} size="medium"/>
                       </Link>
                       {/* user name and date created */}
                       <div className={styles.postInfor}>
                       <Link to={`/user/${post?.userid}`}>
                            <p>{post?.userfullname || ""}</p>
                            </Link>
                            <p>{data.datecreated}</p>
                       </div>
                       </div> 
                   
    
                       {/* post */}
                       <div  title="click to open post"className={styles.postContent}>
                        <p>{!seemore?data.content.substring(0,200):data.content}<span  style={{color:'gray',display:data.content.length<200 || seemore?"none":""}} onClick={()=>{setSeemore(true)}}>...see more</span></p> 
                        {post?.media?.length&&type==="minimal"?<PreviewMedia onOpen={onOpen} media={post.media}/>:<></>}
                       </div>
                       {/* likes and comments */}
                       <div className={styles.like_comment}>
                       <Avatar userAvatar={like}/>
                       <div></div>
                        <p>{data.commentcount} comments</p>
    
                       </div>
            </div>
           
           
           
            </>
        )
    }
    return <></>
}
