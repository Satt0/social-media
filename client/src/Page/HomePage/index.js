import React, { useState,useCallback } from "react";
import styles from "./HomePage.module.scss";
import NewsFeed from "src/Components/NewsFeed";
import CheckIn from "src/Components/CheckIn";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  
 
  const appendPost = useCallback((post) => {
    setPosts((state) => [post, ...state]);
  },[])
  
  return (
    <div className={styles.container}>
      <CheckIn appendPost={appendPost} />     
        <NewsFeed byUID={false} uid={null} posts={posts} setPosts={setPosts} />
    </div>
  );
}

