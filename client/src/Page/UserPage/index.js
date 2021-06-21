import React,{useState,useEffect} from 'react'
import styles from './UserPage.module.scss'
import UserWall from 'src/Components/UserWall'
import NewsFeed from 'src/Components/NewsFeed'
import CheckIn from 'src/Components/CheckIn'
import {useSelector} from 'react-redux'
import API from 'src/lib/API/UserAPI'
export default function UserPage(props) {
    const isUserID=useSelector(state=>state.user.uid)
    const [posts,setPosts]=useState([])
    const [user,setUser]=useState(null)
    useEffect(()=>{
        const uid=props.match.params.uid
        API.getUserById(uid).then(res=>{
            if(res.count>=1 && !res.err){
                setUser(res.rows[0])
            }
            })

        return ()=>{
            setUser(null)
        }
        
        
    },[props.match.params.uid])
    useEffect(()=>{
        if(user?.uid){
            API.getAllPostById(user.uid).then(res=>{
                if(res.count>0){
                    setPosts(res.rows)
                }
            }) 
        }
    },[user])
    const appendPost = (post) => {
        setPosts((state) => [post, ...state]);
      };
    if(user){
        return (
            <div className={styles.pageWrapper}>
                <UserWall  user={user}/>
              {user.uid===isUserID&&
              
               <div className={styles.CheckInWrapper}> <CheckIn appendPost={appendPost}/></div>
              }
               <div className={styles.NewsFeedWrapper}>
               <NewsFeed posts={posts}/>
               </div>
            </div>
        )
    }
    return <></>
}
