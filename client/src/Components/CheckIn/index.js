import React from 'react'
import styles from './CheckIn.module.scss'
import Avatar from 'src/Components/Avatar'
import picture from 'src/stylesheets/svg/picture.svg'
import video from 'src/stylesheets/svg/video.svg'

import checkin from 'src/stylesheets/svg/checkin.svg'

export default function CheckIn() {
    return (
        <div className={styles.container}>
                <div className={styles.CheckInItem}>
                <Avatar size="large"/>
                </div>
                <div className={styles.CheckInStatus}>
                <div className={styles.CheckinForm}>
                    <button>What's in your mind!</button>
                </div>
                <div className={styles.CheckinButton}>
                    <button>
                        <Avatar userAvatar={picture}/>
                    <p>Pictures</p>
                    </button>
                    <button>
                    <Avatar userAvatar={video}/>
                    <p>Videos</p>
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
