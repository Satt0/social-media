import React from "react";
import styles from "./Comment.module.scss";
import { Drawer, useMediaQuery } from "@material-ui/core";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";
import { useLazyQuery ,useMutation} from "@apollo/client";
import Query from "src/lib/API/Apollo/Queries";
import { useSubscription } from "@apollo/client";


export default function Comment({ inMediaBrowser, onOpen, onClose, postID }) {
  const [comment, setComment] = React.useState([]);
  const [isLoad, setIsLoaded] = React.useState(false);

  
  const getPostComment=useLazyQuery(Query.GET_POST_LATEST_COMMENT,{  fetchPolicy: "no-cache"
})
  const postNewComment=useMutation(Query.POST_COMMENT,{fetchPolicy:'no-cache'})
  const elRef = React.useRef(null);
  const userId = useSelector((state) => state.user.uid);
 const [openDrawer,setSwitch]=React.useState(false)
 const isMobile = useMediaQuery("(max-width:1000px)");

  React.useEffect(()=>{
       if(isMobile!==undefined && isMobile!==null){
        if(isMobile&&onOpen&&!inMediaBrowser){
          setSwitch(true)
        }else{
          setSwitch(false)
        }
       }
  },[isMobile,inMediaBrowser,onOpen])

  React.useEffect(() => {
    if (onOpen) {
      setIsLoaded(true);
    }
  }, [onOpen]);
  const onPostComment = (userId, postID) => {
    return async (comment) => {
      const newComment = {
        comment: { content: comment, userid: userId, postid: postID },
      };
      postNewComment[0]({variables:newComment.comment})
  
    };
  };
  React.useEffect(() => {
    if (isLoad) {
      getPostComment[0]({variables:{postid:postID}})
    }
  }, [isLoad, postID]);
  React.useEffect(()=>{
    const data=getPostComment[1].data
    if(data){
      setComment(s=>([...s,...data.getPostCommentById]))
    }
  },[getPostComment[1].data])
  if (comment) {
    return (
      <div
        ref={elRef}
        className={`${styles.container} ${
          onOpen ? styles.open : styles.close
        } ${inMediaBrowser ? styles.inMediaBrowser : ""}`}
      >

        {onOpen?openDrawer?<DrawerComment
            onPostComment={onPostComment(userId, postID)}
            comments={comment}
            onClose={onClose}
            isOpen={true}
          />:
          <ScrollComment
            onPostComment={onPostComment(userId, postID)}
            comments={comment}
            onClose={onClose}
          />:<></>}
        
          
        
      
       
        {onOpen&&postID&&<CommentListener update={setComment} postid={postID}/>}
      </div>
    );
  }

  return <p></p>;
}

const DrawerComment = ({ isOpen, onClose, comments, onPostComment }) => {
  const ref = React.useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    if (ref.current.value.trim() !== "") {
      onPostComment(ref.current.value).then((res) => {
        ref.current.value = "";
      });
    }
  };
  return (
    <Drawer anchor={"bottom"} open={isOpen} onClose={onClose}>
      <div className={styles.drawerComment}>
        <form onSubmit={onSubmit} className={styles.formComment}>
          <input ref={ref} type="text" />
          <button type="submit">post</button>
        </form>
        {comments.map((cmt) => (
          <CommentItem
            data={cmt}
            key={`comment-drawer-${cmt.commentid}-${cmt.postid}-${cmt.userid}`}
          />
        ))}
      </div>
    </Drawer>
  );
};
const ScrollComment = ({ comments, onClose, onPostComment }) => {
  const ref = React.useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (ref.current.value.trim() !== "") {
      onPostComment(ref.current.value).then((res) => {
        ref.current.value = "";
      });
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.formComment}>
        <input ref={ref} type="text" />
        <button type="submit">post</button>
      </form>
      {comments.map((cmt) => (
        <CommentItem
          key={`comment-scroll-${cmt.commentid}-${cmt.postid}-${cmt.userid}`}
          data={cmt}
        />
      ))}

      <h4>load older comment</h4>
    </div>
  );
};
const CommentListener=({postid,update})=>{
  const {data,loading}=useSubscription(Query.UPDATE_COMMENT,{variables:{postid:postid}})
 React.useEffect(()=>{
    console.log(data);
    if(data?.getComment){
      update(s=>([data.getComment,...s]))
    }
  },[data])
  return <></>
}