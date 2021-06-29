import React from "react";
import Avatar from "src/Components/Avatar";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
// icon
import logo from "src/stylesheets/svg/logo.svg";
// import IconBadge from "src/Components/IconBadge";
// import notification from "src/stylesheets/svg/notification.svg";
// material ui
import { useTheme } from "src/lib/hooks/useColor";
// import { SearchBox } from "../SearchBox";
import { useSelector } from "react-redux";
import MessageHistory from "./MessageHistory";
export default function Navbar({userid}) {
  const uid = useSelector((state) => state.user.uid);
  const theme=useTheme()
  const profileImage=useSelector(state=>state.user.profileImage)
  return (
    <header style={{backgroundColor:theme.background,color:theme.text}} className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.groupSearch} style={{display:'flex',alignItems:"center"}}>
          <Link to="/">
            <Avatar userAvatar={logo} />
          </Link>
          {/* <SearchBox /> */}
        </div>

        <div className={styles.groupNotification}  style={{display:'flex',alignItems:"center"}}>
          {/* <IconBadge icon={notification} /> */}
         <div style={{marginRight:8}}>
       
         <MessageHistory userid={userid}/>
         </div>
          {uid && (
            <Link to={`/user/${uid}`}>
              <Avatar userAvatar={profileImage}/>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

