import React from 'react'
import styles from './UserWall.module.scss'
import Avatar from '../Avatar'
export default function UserWall({user}) {
    return (
        <div className={styles.container}> 
        <div className={styles.userInfor}>
       <div className={styles.group}>
       <Avatar size="large" userAvatar={user.picture}/>
        <p>{user.userfullname}</p>
       </div>
        </div>
           <div className={styles.background}></div>
        </div>
    )
}
