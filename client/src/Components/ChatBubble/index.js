import React from 'react'
import styles from './ChatBubble.module.scss'
import Avatar from '../Avatar'
export default function ChatBubble() {
    return (
        <div className={styles.container}>
            <Avatar size="medium"/>
        </div>
    )
}
