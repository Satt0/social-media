import React from "react";
import Avatar from "src/Components/Avatar";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
// icon
import message from "src/stylesheets/svg/message.svg";
import logo from "src/stylesheets/svg/logo.svg";
import IconBadge from "src/Components/IconBadge";
import notification from "src/stylesheets/svg/notification.svg";
// material ui

import { SearchBox } from "../SearchBox";
import { useSelector } from "react-redux";

export default function Navbar() {
  const uid = useSelector((state) => state.user.uid);
  const profileImage=useSelector(state=>state.user.profileImage)
  return (
    <header className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.groupSearch}>
          <Link to="/">
            <Avatar userAvatar={logo} />
          </Link>
          <SearchBox />
        </div>

        <div className={styles.groupNotification}>
          <IconBadge icon={message} />
          <IconBadge icon={notification} />
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
