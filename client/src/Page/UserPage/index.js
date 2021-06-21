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
 
    const appendPost = React.useCallback((post) => {
        setPosts((state) => [post, ...state]);
      },[])
    if(user?.uid>=0){
        return (
            <div className={styles.pageWrapper}>
                <UserWall  user={user}/>
              {user.uid===isUserID&&
              
               <div className={styles.CheckInWrapper}> <CheckIn appendPost={appendPost}/></div>
              }
               <div className={styles.NewsFeedWrapper}>
               <NewsFeed posts={posts} uid={user.uid} byUID={true} setPosts={setPosts}/>
               </div>
            </div>
        )
    }
    return <></>
}
