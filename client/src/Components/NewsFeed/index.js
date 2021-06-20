import React from 'react'
import Post from 'src/Components/Post'
export default function NewsFeed({posts}) {
    return (
        <div>
           {posts.map((data,index)=><Post key={'post-id-'+index} data={data}/>)}
            
        </div>
    )
}
