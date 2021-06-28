import { gql } from "@apollo/client";

const Query = {
  GET_USER_INFORMATION: gql`
    query getUserInformation($id: Int!) {
      getUserInformation(userid: $id) {
        userid
        userfullname
        userdisplayname
        picture
      }
    }
  `,
  GET_LATEST_POST:gql`
    query{
	getLatestPost{
    postid
    userid
    content
      datecreated
      media
      likecount
      commentcount
      embeded
      
    user {
      picture
      userid
      userfullname
      
    }}
  
}
  `,
  GET_USER_LATEST_POST:gql`
   query  getLatestPostByUserID($userid:Int!){
  getLatestPostByUserID(userid:$userid){
    postid
    userid
    content
      datecreated
      media
      likecount
      commentcount
      embeded
    
  user {
    picture
    userid
    userfullname
  }}
  
  }
  `,
  GET_POST_LATEST_COMMENT:gql`
  query getPostCommentById($postid:Int!){
  getPostCommentById(postid:$postid){
    commentid
  postid
  userid
  content
  datecreated
  user {
    picture
    userfullname
    userid
  }}
  }
  `,
  POST_COMMENT:gql`
  mutation createComment($userid:Int!,$content:String!,$postid:Int!){
    createComment(input:{userid:$userid,content:$content,postid:$postid}){
      content
      commentid
      datecreated
      userid
      postid
      user{
        picture
        userfullname
        userid
      }
      }
  }`,
UPDATE_COMMENT:gql`
 subscription getComment($postid:Int!){
getComment(postid:$postid){
  commentid
  userid
  content
  datecreated
  
  user{
    userid
    userfullname
    userdisplayname
    picture
  }
}
}`,
LISTEN_MESSAGE:gql`
subscription waitAllMessage($userid:Int!){
   
  
waitAllMessage(userid:$userid){
  messageid
  content
  userid
  receiver
  datecreated
  conversationid
}
}`,
GET_ALL_CONVERSATION:gql`
   query getAllConversation($userid:Int!) {
getAllConversation(userid:$userid){
conversationid
userid1
userid2
lastactivedate
lastmessage{
  content
  receiver
}}
}
`,
SEND_MESSAGE:gql`
mutation sendMessage($userid:Int!,$conversationid:Int!,$receiver:Int!,$content:String!){
  sendMessage(input:{userid:$userid,conversationid:$conversationid,receiver:$receiver,content:$content}){
    content
    messageid
    datecreated
    userid
    conversationid
    receiver
  }
}
`,
INIT_MESSAGE:gql`
  mutation initConversation($userid1:Int!,$userid2:Int!){
      initConversation(input:{userid1:$userid1,userid2:$userid2}){
              conversationid
              userid1
              userid2
  
}

}`,
GET_CONVERSATION_MESSAGE:gql`
query getAllMessage($id:Int!){
getAllMessage(conversationid:$id){
messageid
userid
conversationid
content
receiver
  
}
}

`

};
export default Query