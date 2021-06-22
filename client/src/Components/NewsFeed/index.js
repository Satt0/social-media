import React, { useState, useEffect } from "react";
import Post from "src/Components/Post";
import MediaBrowser from "../MediaBrowser";
import InfiniteScroll from "react-infinite-scroll-component";
import API from "src/lib/API/UserAPI";

export default function NewsFeed({ posts, setPosts,byUID=false,uid }) {
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrent] = useState(null);
  const [hasMore,setHasMore]=useState(true)
 
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
            API.getAllPostById(uid).then(res=>{
                if(res.count>0){
                    setPosts(res.rows)

                    if(res.count<10){
                        setHasMore(false)
                    }
                }
            }) 
        }else{
            API.getLatestPost().then((res) => {
                if (!res.err) {
                  setPosts(res.rows);
                  if(res.count<10){
                      setHasMore(false)
                  }
                }
              });
        }
        return ()=>{
            setPosts([])
        }
    },[uid,byUID])
    
  const openBrowser = (index) => {
    return () => {
      setOpen(true);
      setCurrent(posts[index]);
    };
  };
  if (posts[0]) {
    return (
      <div>
        {currentPost&&<MediaBrowser
          open={open}
          post={currentPost}
          
          onClose={() => {
            setOpen(false);
          }}
        />}
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={onUpdate}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" ,marginTop:10}}>
              <b>No more Posts!</b>
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
          {posts.map((data, index) => (
            <Post
                propsStyle={{marginBottom:17}}
              onOpen={openBrowser(index)}
              key={"post-id-" + index}
              data={data}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
  return <></>;
}
