
const {
  getLatestPosts,
  getPostLatestCommentByIdLimit10,
  getUserPostById,
  getOnePostById,
  userCommentPost,
  userLikePostLock,
  updatePostLikeCountIncreBy1,
  checkUserLIKEDPost,
  deleteLike
  
} = require("../database/queries/PostQueries");

const {initConversation,insertMessage,getAllConversation, getAllMessage} = require('../database/queries/MessageQueries')
const { getUserInformationById } = require("../database/queries/UserQueries");
const { withFilter } =require( 'graphql-subscriptions');

const  COMMENT_ADDED="newComment"
const MESSAGE_ADDED="newMessage"


const resolvers = {
  Query: {
    async getLatestPostByUserID(_, { userid }, __) {
      return await getUserPostById(userid).then((res) => res.rows);
    },
    async getLatestPost() {
      return await getLatestPosts().then((res) => res.rows);
    },
    async getUserInformation(_, { userid }, __) {
      return await getUserInformationById(userid).then((res) => ({
        ...res.rows[0],
        userid: userid,
      }));
    },


    async getPostCommentById(_, { postid }, __) {
      return await getPostLatestCommentByIdLimit10(postid).then(
        (res) => res.rows
      );
    },
    async getPostInformationById(_,{postid},__){
          const res= await getOnePostById(postid)

          return res
    },
    async checkUserLikePost(_,{input},__){
        
        const result=await checkUserLIKEDPost(input.userid,input.postid)
       
        return {didlike:result}
    },
    async getAllConversation(_,{userid},__){
        return await getAllConversation({userid})
    },
    async getAllMessage(_,{conversationid},__){
      return await getAllMessage({conversationid})
    }
  },

  Comment: {
    async user({ userid }) {
      return await getUserInformationById(userid).then((res) => ({
        ...res.rows[0],
        userid: userid,
      }));
    },
  },
  Post: {
    async user({ userid }) {
      return await getUserInformationById(userid).then((res) => ({
        ...res.rows[0],
        userid: userid,
      }));
    }
    
  },
  Mutation:{
    async createComment(_,{input},ctx){
        const comment= await userCommentPost(input).then(res=>res.rows[0])
        ctx.pubsub.publish(COMMENT_ADDED, {...comment,userid:parseInt(comment.userid),postid:parseInt(comment.postid)});
        return comment
    },
    async createLike(_,{input},__){
        try{

            await userLikePostLock(input.userid,input.postid,input.iconcode)
           
            await updatePostLikeCountIncreBy1(input.postid,1)
          
            return {status:true,change:true}
        }catch (e){
            return {status:true,change:false}
        }
        
    },
    async deleteLike(_,{input},__){
         try{
           const {userid,postid}=input
          const isDeleted=await deleteLike(postid,userid)
          if(isDeleted){
            await updatePostLikeCountIncreBy1(input.postid,-1)
            
            return {status:true,change:true}
          }
          return {status:true,change:false}
         }
         catch(e){
           return {status:false,change:false}
         }
          
    },
    initConversation:async (_,{input},__)=>{
        try{
          const {userid1,userid2}=input
          if(userid1===userid2)
              throw new Error("bad request!")
          const res=await initConversation(input)
        
      return res
        }catch(e){
          throw e
        }
    },
    sendMessage:async(_,{input},ctx)=>{
      const result= await insertMessage(input)
      ctx.pubsub.publish(MESSAGE_ADDED,result)
      return result
    }
  },
 
  Subscription: {
    getComment:{
      subscribe:withFilter((_,__,ctx) => ctx.pubsub.asyncIterator(COMMENT_ADDED), (payload, variables) => {
        return parseInt(payload.postid) === parseInt(variables.postid);
      }),
      resolve:(payload)=>{
        
            return payload
      }
      
    },
    waitMessageOneConversation:{
      subscribe:withFilter((_,__,ctx) => ctx.pubsub.asyncIterator(MESSAGE_ADDED), (payload, variables) => {
        return parseInt(payload.receiver) === parseInt(variables.input.userid) && payload.conversationid===variables.input.conversationid
      }),
      resolve:(payload)=>{
        return payload
      }
    },
    waitAllMessage:{
      subscribe:withFilter((_,__,ctx) => ctx.pubsub.asyncIterator(MESSAGE_ADDED), (payload, variables) => {
        return parseInt(payload.receiver) === parseInt(variables.userid)
      }),
      resolve:(payload)=>{
        return payload
      }
    }

    
  }
};



module.exports = { resolvers };
