import React, { useState,useCallback } from "react";
import styles from "./HomePage.module.scss";
import NewsFeed from "src/Components/NewsFeed";
import CheckIn from "src/Components/CheckIn";
import { useTheme } from "src/lib/hooks/useColor";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const theme=useTheme()
  
 
  const appendPost = useCallback((post) => {
        setPosts(state=>([post,...state]))
  },[])
  
  return (
    <div  className={styles.container} style={{backgroundColor:theme.background,color:theme.text}}>
      <CheckIn appendPost={appendPost} />     
        <NewsFeed byUID={false} uid={null} posts={posts} setPosts={setPosts} />
    </div>
  );
}

