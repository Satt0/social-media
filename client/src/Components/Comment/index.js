import React from "react";
import styles from "./Comment.module.scss";
import { Drawer, useMediaQuery } from "@material-ui/core";
import CommentItem from "./CommentItem";
import API from "src/lib/API/UserAPI";
import { useSelector } from "react-redux";
function isElementInViewport(el) {
  // Special bonus for those using jQuery
  try {
    if (typeof window) {
      var rect = el.getBoundingClientRect();

      return rect.y > 0;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export default function Comment({ inMediaBrowser, onOpen, onClose, postID }) {
  const [comment, setComment] = React.useState(null);
  const [isLoad, setIsLoaded] = React.useState(false);
  const [lastTrackedComment,setLastTracked]=React.useState(0)
  const elRef = React.useRef(null);
  const userId = useSelector((state) => state.user.uid);
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
      const data = await API.userCommentPost(newComment).then((res) => {
        const update={
          update:{
            lastid:lastTrackedComment,
            postid:postID
          }
        }
        API.updateCommentByLastID(update).then(res=>{
          if(!res.err)
          {
            if(res?.rows?.length ){
              setComment(state=>([...res.rows,...state]))
              setLastTracked(res.rows[0].commentid)
            }
          }
        })

        return true;
      });
      return data;
    };
  };
  React.useEffect(() => {
    if (isLoad) {
      
      API.getPostLatestComment(postID).then((res) => {
        if(!res.err){
          setComment(res.rows);
        }
      });
    }
  }, [isLoad, postID]);

  React.useEffect(() => {
    let a;
    if (isLoad && onOpen && postID) {
      a = setInterval(() => {
        if (isElementInViewport(elRef.current)) {
          const update={
            update:{
              lastid:lastTrackedComment,
              postid:postID
            }
          }
          API.updateCommentByLastID(update).then(res=>{
            if(!res.err){
              if(res?.rows?.length){
                setComment(state=>([...res.rows,...state]))
                setLastTracked(res.rows[0].commentid)
                console.log(res.rows[0].commentid);
              }
            }
          })



          // API.getPostLatestComment(postID).then((res) => {
          //   console.log("test");
          //   setComment((state) => {

          //     try {
          //       const newState = res.rows.filter(
          //         (e) => e.commentid > state[0].commentid
          //       );
                  
          //       return [...newState, ...state];
          //     } catch (e) {
          //       if(res?.rows.length){
          //         return [...res.rows, ...state];
          //       }
          //       return state
          //     }



          //   });
          //  if(res?.rows[0]?.commentid){
          //   setLastTracked(res.rows[0].commentid)
          //   console.log(res.rows[0].commentid);
          //  }
          // });
        } else {
          return;
        }
      }, 5000);
    }
    return () => {
      clearInterval(a);
    };
  }, [isLoad, onOpen, postID, comment,lastTrackedComment]);
  const isMobile = useMediaQuery("(max-width:1000px)");
  if (comment) {
    return (
      <div
        ref={elRef}
        className={`${styles.container} ${
          onOpen ? styles.open : styles.close
        } ${inMediaBrowser ? styles.inMediaBrowser : ""}`}
      >
        {isMobile && onOpen && (
          <DrawerComment
            onPostComment={onPostComment(userId, postID)}
            comments={comment}
            onClose={onClose}
            isOpen={true}
          />
        )}
        {onOpen && (
          <ScrollComment
            onPostComment={onPostComment(userId, postID)}
            comments={comment}
            onClose={onClose}
          />
        )}
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
            key={`comment${cmt.commentid}-${cmt.postid}-${cmt.userid}`}
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
          key={`comment${cmt.commentid}-${cmt.postid}-${cmt.userid}`}
          data={cmt}
        />
      ))}

      <h4 onClick={onClose}>hide comment</h4>
    </div>
  );
};
