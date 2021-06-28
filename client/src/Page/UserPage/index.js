import React,{useState,useEffect} from 'react'
import styles from './UserPage.module.scss'
import UserWall from 'src/Components/UserWall'
import NewsFeed from 'src/Components/NewsFeed'
import CheckIn from 'src/Components/CheckIn'
import {useSelector} from 'react-redux'
import { useQuery } from '@apollo/client'
import Query from 'src/lib/API/Apollo/Queries'
import { useTheme } from "src/lib/hooks/useColor";


export default function UserPage({match}) {
    const isUserID=useSelector(state=>state.user.uid)
    const [posts,setPosts]=useState([])
    const [user,setUser]=useState(null)
    const theme=useTheme()
    const { loading, error, data} = useQuery(Query.GET_USER_INFORMATION, {
        variables: { id:parseInt(match.params.uid) },
        errorPolicy:"all"
      });
    const appendPost = React.useCallback((post) => {
        setPosts((state) => [post, ...state]);
      },[])
      React.useEffect(()=>{
         
         
        if(data){
           
           setUser(data.getUserInformation)
        }
    },[data,error,match])
    

   
 
   
    if(user?.userid){
        return (
            <div className={styles.pageWrapper} style={{backgroundColor:theme.background,color:theme.text}}>
                <UserWall  isLocal={isUserID===user.userid} user={user}/>
              {user.userid===isUserID&&
              
               <div className={styles.CheckInWrapper}> <CheckIn appendPost={appendPost}/></div>
              }
               <div className={styles.NewsFeedWrapper}>
               <NewsFeed posts={posts} uid={user.userid} byUID={true} setPosts={setPosts}/>
               </div>
            </div>
        )
    }
    return <></>
}
