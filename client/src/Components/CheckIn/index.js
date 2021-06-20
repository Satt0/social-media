import React,{ useState} from 'react'
import styles from './CheckIn.module.scss'
import Avatar from 'src/Components/Avatar'
import picture from 'src/stylesheets/svg/picture.svg'
import video from 'src/stylesheets/svg/video.svg'
import PostEdit from '../PostEdit'
import checkin from 'src/stylesheets/svg/checkin.svg'

export default function CheckIn() {
    const [openEditor,setOpenEditor]=useState(false)
    
    return (
        <div className={styles.container}>
                {openEditor&&<PostEdit onClose={()=>{setOpenEditor(false)}}/>}
                <div className={styles.CheckInItem}>
                <Avatar size="large"/>
                </div>
                <div className={styles.CheckInStatus}>
                <div className={styles.CheckinForm}>
                    <button onClick={()=>{setOpenEditor(true)}}>What's in your mind!</button>
                </div>
                <div className={styles.CheckinButton}>
                    <button onClick={()=>{setOpenEditor(true)}}>
                        <Avatar userAvatar={picture}/>
                    <p>Media</p>
                    </button>
                    <button>
                    <Avatar userAvatar={video}/>
                    <p>Live</p>
                    </button>
                    <button>
                    <Avatar userAvatar={checkin}/>   
                    <p>Checkin! </p> 
                                        </button>
                </div>

                </div>
        </div>
    )
}
