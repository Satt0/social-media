import React from 'react'
import { getImageURL } from 'src/lib/Ultilities/getURL';
import styles from './Preview.module.scss'
export default function PreviewMedia({media,onOpen,handleOpen}) {
    return (
        <div onClick={onOpen} className={`${styles.container} ${media.length===1?styles.single:styles.many}`}>
            <GetElement media={media[0]}/>
            {media.length>=2&&<GetElement left={media.length-2} media={media[1]}/>}
            
        </div>
    )
}



const GetElement=({media,left})=>{
        const isVideo=media.type.match(/^video/)
           
        return <div className={styles.VideoThumbnail} style={{backgroundImage:isVideo?'':`url("${getImageURL(media)}")`,width:'100%',height:'100%'}}>

            {left>0&&<div className={styles.mediaRemain}>
                <p>{left}+</p>
            </div>}
        </div>
    }