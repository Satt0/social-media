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



const link=`https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-1/cp0/p80x80/127251021_2554208024870944_1193759709687799422_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=dbb9e7&_nc_ohc=m13s_atPGE8AX9NF4UF&_nc_ht=scontent-hkg4-2.xx&tp=27&oh=e12b7d40f1c53af2bba60fe20f723fa5&oe=60D0DAA2`
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
                    <Avatar userAvatar={link}/>
                    </div>
                </div>
        </header>
    )
}


