import React, { useState } from "react";
import styles from "./Post.module.scss";
import Avatar from "../Avatar";
import like from "src/stylesheets/svg/reaction.svg";
import userLike from "src/stylesheets/svg/userreaction.svg";
import { Link } from "react-router-dom";
import PreviewMedia from "../PreviewMedia";
import Comment from "../Comment";
import { Badge, withStyles } from "@material-ui/core";
import { timeConverter } from "src/lib/Ultilities/Format";
import { likePost, checkLikeStatus, deleteLike } from "src/lib/API/Graphql";
import { useSelector } from "react-redux";
import { useTheme } from "src/lib/hooks/useColor";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 5,
    top: 30,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "#fd0061",
  },
}))(Badge);

export default function Post({
  data,
  onOpen,
  type = "minimal",
  propsStyle,
}) {
  const [seemore, setSeemore] = useState(false);
  const [seeComment, setCommentView] = useState(type!=="minimal");
  const [didLike, setLike] = useState(null);
  const [isLock, setLock] = useState(false);
  const [likeCount, setCount] = useState(0);
  const userid = useSelector((state) => state.user.uid);
  const theme=useTheme()
  React.useEffect(() => {
    if (userid && data.postid) {
      checkLikeStatus({ userid: userid, postid: data.postid }).then((res) => {
        if (res.data) {
          const didlike = res.data.checkUserLikePost.didlike;
          if (didlike) {
            setLike(true);
          } else {
            setLike(false);
          }
          setCount(parseInt(data.likecount));
        } else {
          setLike(null);
        }
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (isLock) {
      if (didLike === false) {
        likePost({ userid: userid, postid: data.postid, iconcode: 1 }).then(
          (res) => {
            if (res.data) {
              setLike(true);

              setCount((c) => c + 1);
            }
          }
        );
      } else if (didLike === true) {
        deleteLike({ userid: userid, postid: data.postid }).then((res) => {
          if (res.data) {
            setLike(false);

            setCount((c) => c - 1);
          }
        });
      }
    }
  }, [isLock]);
  // unlock like button
  React.useEffect(() => {
    
    let a;
    if (didLike !== null) {
      a = setTimeout(() => {
        setLock(false);
      }, 200);
    }
    return () => {
      clearTimeout(a);
    };
  }, [didLike]);
  if (data) {
    return (
      <>
        <div style={{...propsStyle,backgroundColor:theme.backgroundPost,color:theme.text}} className={styles.container} tabIndex="1">
          {/* user infor */}

          <div className={styles.userInfor}>
            <Link to={`/user/${data?.userid}`}>
              <Avatar userAvatar={data?.user?.picture ?? null} size="medium" />
            </Link>
            {/* user name and date created */}
            <div className={styles.postInfor}>
              <Link to={`/user/${data?.userid}`}>
                <p>{data?.user?.userfullname || ""}</p>
              </Link>
              <p>{timeConverter(data.datecreated)}</p>
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

                  if (seemore) {
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
            {data?.media !== "[]" && type === "minimal" ? (
              <PreviewMedia onOpen={onOpen} media={JSON.parse(data.media)} />
            ) : (
              <></>
            )}
          </div>
          {/* likes and comments */}
          <div className={styles.like_comment}>
            <button
              disabled={isLock || didLike === null}
              className="button-none"
              onClick={() => {
                setLock(true);
              }}
            >
              <StyledBadge
                badgeContent={likeCount}
                color="secondary"
              >
                <Avatar userAvatar={didLike ? userLike : like} round={false} />
              </StyledBadge>
            </button>

            <div></div>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                
                  setCommentView((s) => !s);
                
              }}
            >
              comments
            </p>
          </div>
          <Comment
            userId={data.userid}
            postID={data.postid}
            onOpen={seeComment}
            onClose={() => {
              setCommentView(false);
            }}
            inMediaBrowser={type !== "minimal"}
          />
        </div>
      </>
    );
  }
  return <></>;
}
