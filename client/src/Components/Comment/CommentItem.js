import React from "react";
import Avatar from "../Avatar";
import styles from "./Comment.module.scss";
import { Link } from "react-router-dom";
const wordLimit = 20;
export default function CommentItem({ data }) {
  const [user,setUser]=React.useState({})

React.useEffect(()=>{
      setUser(data.user)
    
},[data])

  const [seeMore, setSeeMore] = React.useState(false);
  if (data?.content) {
    return (
      <div className={styles.commentItem}>
<div className={styles.userinfor}>
<Link to={`/user/${data.userid}`}>
<Avatar userAvatar={user?.picture} />
        </Link>
  </div>        
        <div>
        <p className={styles.comment}>
          <Link to={`/user/${data.userid}`}>
        <strong>{user?.userfullname}</strong>
        </Link>
        <br/>
          {data.content.length > wordLimit && !seeMore
            ? data.content.substring(0, wordLimit)
            : data.content}
          {data.content.length > wordLimit && (
            <span
              onClick={() => {
                setSeeMore((s) => !s);
              }}
              style={{ color: "gray" }}
            >
              ...see {seeMore ? "less" : "more"}
            </span>
          )}
          <br/>
                              <span className={styles.commentInfor}>{timeConverter(data.datecreated)} <span style={{color:"gray",marginLeft:20}}>replies</span></span>

        </p>
        

        </div>

        
      </div>
    );
  }
  return <></>;
}

function timeConverter(UNIX_timestamp){
  var utcSeconds = UNIX_timestamp/1000;
var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
d.setUTCSeconds(utcSeconds);
return d.toDateString()
}