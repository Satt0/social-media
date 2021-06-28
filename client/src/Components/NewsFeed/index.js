import React, { useState, useEffect } from "react";
import Post from "src/Components/Post";
import MediaBrowser from "../MediaBrowser";
// import InfiniteScroll from "react-infinite-scroll-component";
import API from "src/lib/API/UserAPI";
import { useLazyQuery } from "@apollo/client";
import Query from "src/lib/API/Apollo/Queries";
export default function NewsFeed({ posts, setPosts,byUID=false,uid }) {
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrent] = useState(null);
  const [hasMore,setHasMore]=useState(true)
  const getAllPost=useLazyQuery(Query.GET_LATEST_POST,{fetchPolicy: "no-cache"})
  const getUserPost=useLazyQuery(Query.GET_USER_LATEST_POST,{fetchPolicy: "no-cache"})
  const onUpdate = () => {
    if (posts.length > 0) {
        const  lastId = posts[posts.length - 1].postid;
      if(!uid || !byUID){
        API.getEarlierPostByLastId(lastId).then((res) => {
          setPosts((state) => [...state, ...res.rows]);
  
          if (res.rows.length < 10) {
            setHasMore(false);
          }
        })
      }
      else{
          API.getUserEarlierPostById(uid,lastId).then(res=>{
            setPosts((state) => [...state, ...res.rows]);
  
            if (res.rows.length < 10) {
              setHasMore(false);
            }
          })
      }
    }

    }
  
     useEffect(()=>{
        if(uid>=0 && byUID===true){
           
            getUserPost[0]({variables:{userid:uid}}) 
           
        }else{
            getAllPost[0]()
        }
    },[uid,byUID])
    React.useEffect(()=>{
      const data=getAllPost[1].data
      if(data){
        setPosts(data.getLatestPost)
      }
    },[getAllPost])
    React.useEffect(()=>{
      const data=getUserPost[1].data
      if(data){
         setPosts(data.getLatestPostByUserID)
      }
    },[getUserPost])
  const openBrowser = (index) => {
    return () => {
      setOpen(true);
      setCurrent(posts[index].postid);
    };
  };
  if (posts.length>0) {
    return (
      <div>
        {currentPost&&<MediaBrowser
          open={open}
          postid={currentPost}
          
          onClose={() => {
            setOpen(false);
          }}
        />}
        
          {posts.map((data, index) => (
            <Post
                propsStyle={{marginBottom:17}}
              onOpen={openBrowser(index)}
              key={"post-id-" + data.postid}
              data={data}
            />
          ))}
       
      </div>
    );
  }
  return <></>;
}
