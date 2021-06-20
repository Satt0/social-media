import React,{useState,useEffect} from 'react'
import styles from './HomePage.module.scss'
import NewsFeed from 'src/Components/NewsFeed'
import CheckIn from 'src/Components/CheckIn'
import API from 'src/lib/API/UserAPI'

export default function HomePage() {
    const [posts,setPosts]=useState([])
    useEffect(() => {
        API.getLatestPost().then(res=>{

            if(!res.err){
                setPosts(res.rows)
            }
        })
        
    }, [])
    return (
        <div className={styles.container}>
            <CheckIn/>
            <NewsFeed posts={posts}/>
        </div>
    )
}
