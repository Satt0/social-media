import React from 'react'
import styles from './Post.module.scss'
import Avatar from '../Avatar'
import like from 'src/stylesheets/svg/reaction.svg'
import avatar from 'src/Components/Avatar/avatar.jpg'
export default function Post() {
    return (
        <div className={styles.container} tabIndex="1">
               {/* user infor */}
               <div className={styles.userInfor}>
                   <Avatar userAvatar={avatar} size="medium"/>
                   {/* user name and date created */}
                   <div className={styles.postInfor}>
                        <p>User Name</p>
                        <p>Date Created</p>
                   </div>
                   </div> 

                   {/* post */}
                   <div className={styles.postContent}>
                    <p>Hello this is my first post</p>
                    <div className={styles.postMedia}></div>
                   </div>
                   {/* likes and comments */}
                   <div className={styles.like_comment}>
                   <Avatar userAvatar={like}/>
                   <div></div>
                    <p>69 comments</p>

                   </div>
        </div>
    )
}
