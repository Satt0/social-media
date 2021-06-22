import React from "react";
import Avatar from "../Avatar";
import styles from "./Comment.module.scss";
import API from "src/lib/API/UserAPI";
const wordLimit = 20;
export default function CommentItem({ data }) {
  const [user,setUser]=React.useState({})

React.useEffect(()=>{
      
      API.getUserById(data.userid).then(res=>{
          
         
        if(res?.count){
            setUser({...res.rows[0],...data})
        }
      })
    
},[data])

  const [seeMore, setSeeMore] = React.useState(false);
  if (data?.content) {
    return (
      <div className={styles.commentItem}>
<div className={styles.userinfor}>
<Avatar userAvatar={user?.picture} />

  </div>        
        <div>
          
        <p className={styles.comment}>
        <strong>{user?.userfullname}</strong><br/>
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
                              <span className={styles.commentInfor}>2021-12-4 <span style={{color:"gray",marginLeft:20}}>replies</span></span>

        </p>
        

        </div>

        
      </div>
    );
  }
  return <></>;
}
