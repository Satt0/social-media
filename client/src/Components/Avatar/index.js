import React from 'react'
import styles from './Avatar.module.scss'
import noAvatar from './avatar.jpg'
export default function Avatar({userAvatar,size="small"}) {
    let imgSize
    switch (size) {
        case "small":imgSize=styles.small
            
            break;
            case "medium":imgSize=styles.medium
            
            break;
            case "large":imgSize=styles.large
            
            break;
        default:
            imgSize=styles.small
            break;
    }
    return (
        <div className={`${styles.avatar} ${imgSize}`} >
            <img alt="user avatar"  src={userAvatar??noAvatar}/>
        </div>
    )
}
