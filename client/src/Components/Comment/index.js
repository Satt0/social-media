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
        if (res?.rows[0]) {
          setComment((state) => [res.rows[0], ...state]);
        }
        return true;
      });
      return data;
    };
  };
  React.useEffect(() => {
    if (isLoad) {
      API.getPostLatestComment(postID).then((res) => {
        setComment(res.rows);
      });
    }
  }, [isLoad, postID]);

  React.useEffect(() => {
    let a;
    if (isLoad && onOpen && postID) {
      a = setInterval(() => {
        if (isElementInViewport(elRef.current)) {
          console.log(isElementInViewport(elRef.current));
          API.getPostLatestComment(postID).then((res) => {
            setComment((state) => {
              try {
                const newState = res.rows.filter(
                  (e) => e.commentid > state[0].commentid
                );
                return [...newState, ...state];
              } catch (e) {
                return [...res.rows, ...state];
              }
            });
          });
        } else {
          return;
        }
      }, 5000);
    }
    return () => {
      clearInterval(a);
    };
  }, [isLoad, onOpen, postID, comment]);
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
