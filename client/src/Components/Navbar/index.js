import React from 'react'
import Avatar from 'src/Components/Avatar'
import styles from './Navbar.module.scss'
// icon
import message from 'src/stylesheets/svg/message.svg'
import logo from 'src/stylesheets/svg/logo.svg'
import IconBadge from 'src/Components/IconBadge'
import notification from 'src/stylesheets/svg/notification.svg'
// material ui

import { SearchBox } from '../SearchBox'



export default function Navbar() {
    return (
        <header className={styles.navbar}>
                <div className={styles.content}>
                    <div className={styles.groupSearch}>
                    <Avatar userAvatar={logo}/>
                    <SearchBox/>
                    </div>

                    <div className={styles.groupNotification}>
                    
                    <IconBadge icon={message}/>
                    <IconBadge icon={notification}/>
                    <Avatar />
                    </div>
                </div>
        </header>
    )
}


