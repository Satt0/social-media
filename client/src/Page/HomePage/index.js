import React from 'react'
import styles from './HomePage.module.scss'
import NewsFeed from 'src/Components/NewsFeed'
import CheckIn from 'src/Components/CheckIn'
export default function HomePage() {
    return (
        <div className={styles.container}>
            <CheckIn/>
            <NewsFeed/>
        </div>
    )
}
