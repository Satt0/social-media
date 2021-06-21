import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.scss";
import NewsFeed from "src/Components/NewsFeed";
import CheckIn from "src/Components/CheckIn";
import API from "src/lib/API/UserAPI";
import InfiniteScroll from "react-infinite-scroll-component";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [hasMore,setHasMore]=useState(true)
  useEffect(() => {
    API.getLatestPost().then((res) => {
      if (!res.err) {
        setPosts(res.rows);
        if(res.rows.length<=10){
            setHasMore(false)
        }
        
      }
    });
  }, []);
  const onRefresh=()=>{
    API.getLatestPost().then((res) => {
        if (!res.err) {
          setPosts(res.rows);
        }
      });
  }
  const onUpdate=()=>{
     
       
            if(posts.length>0){

                const lastId=posts[posts.length-1].postid
                API.getEarlierPostByLastId(lastId).then(res=>{
                        
                     setPosts(state=>([...state,...res.rows]))
                    
                if(res.rows.length<10){
                    setHasMore(false)

                }                    
              
            
          })
            }
            
          
        
      
  }
  const appendPost = (post) => {
    setPosts((state) => [post, ...state]);
  };
  return (
    <div className={styles.container}>
      <CheckIn appendPost={appendPost} />
      
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={onUpdate}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={onRefresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
      >
        <NewsFeed posts={posts} />
      </InfiniteScroll>
    </div>
  );
}

