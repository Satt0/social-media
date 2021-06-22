import React, { useState } from "react";
import styles from "./Post.module.scss";
import Avatar from "../Avatar";
import like from "src/stylesheets/svg/reaction.svg";
import API from "src/lib/API/UserAPI";
import { Link } from "react-router-dom";
import PreviewMedia from "../PreviewMedia";
import { useSelector } from "react-redux";
import Comment from "../Comment";
export default function Post({ data, onOpen, type = "minimal", propsStyle }) {
  const [seemore, setSeemore] = useState(false);
  const localUser=useSelector(state=>state.user)
  const [post, setPost] = React.useState(null);
  const [seeComment,setCommentView]=useState(false)
  React.useEffect(() => {
    if (data) {
      setPost((state) => ({
        ...state,
        ...data,
        media: JSON.parse(data.media),
      }));
    }
  }, [data]);
  React.useEffect(() => {
   
      if(data.userid!==localUser.uid && !post){
        API.getUserById(data.userid).then((res) => {
          setPost((state) => ({ ...state, ...res.rows[0] }));
          console.log('retrieving user data');
        });
      }
      
    
  }, [data,localUser,post]);
  React.useEffect(()=>{
      if(data.userid===localUser.uid){
        setPost(state=>({...state,picture:localUser.profileImage,userfullname:localUser.fullName}))

      }
  },[localUser,data])

  

  if (post) {
    return (
      <>
        <div style={propsStyle} className={styles.container} tabIndex="1">
          {/* user infor */}

          <div className={styles.userInfor}>
            <Link to={`/user/${post?.userid}`}>
              <Avatar userAvatar={post.picture ?? null} size="medium" />
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
          <div title="click to open post" className={styles.postContent}>
            <p>
              {!seemore ? data.content.substring(0, 200) : data.content}
              <span
                style={{
                  color: "gray",
                  display: data.content.length < 200 ? "none" : "",
                }}
                onClick={(e) => {
                  setSeemore((state) => !state);
                  
                  if(seemore){
                    setTimeout(() => {
                        e.target.scrollIntoView({
                          behavior: "smooth",
                          block: "end",
                          inline: "nearest",
                        });
                      }, 50);
                  }
                }}
              >
                ...see {seemore ? "less" : "more"}
              </span>
            </p>
            {post?.media?.length && type === "minimal" ? (
              <PreviewMedia onOpen={onOpen} media={post.media} />
            ) : (
              <></>
            )}
          </div>
          {/* likes and comments */}
          <div className={styles.like_comment}>
            <Avatar userAvatar={like} />
            <div></div>
            <p style={{cursor:'pointer'}} onClick={()=>{setCommentView(s=>!s)}}>comments</p>
          </div>
          <Comment userId={data.userid} postID={data.postid} onOpen={seeComment} onClose={()=>{setCommentView(false)}} inMediaBrowser={type!=="minimal"}/>
        </div>
      </>
    );
  }
  return <></>;
}
