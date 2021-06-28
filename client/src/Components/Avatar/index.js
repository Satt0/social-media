import React from 'react'
import styles from './Avatar.module.scss'
import noAvatar from './avatar.jpg'
import { getAvatarImage } from 'src/lib/Ultilities/getURL'
export default function Avatar({userAvatar,size="small",from,round=true}) {
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
        <div style={{borderRadius:round?"":"0",backgroundImage:`url("${getAvatarImage(userAvatar)??noAvatar}")`}} className={`${styles.avatar} ${imgSize}`} >
            
        </div>
    )
}
