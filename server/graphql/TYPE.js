const {gql} = require('graphql-tag')

const typeDefs=gql`
    type Post{
        postid:Int!
        userid:Int!
        content:String!
        media:String!
        datecreated:String!
        likecount:String!
        embeded:String
        commentcount:String
        user:User!
    }
    type User{
        userid:Int!
        userfullname:String!
        userdisplayname:String!
        picture:String
       

    }

    # comment   
    type Comment {
        commentid:Int!
        postid:Int!
        userid:Int!
        content:String!
        datecreated:String
        user:User
    }
    input CommentInput{
        userid:Int!
        postid:Int!
        content:String!
    }
    
    input PostInput{
        postid:Int!
        userid:Int!
        content:String!
        media:String
        embeded:String
        commentcount:String
    }
    type DidLike{
        didlike:Boolean
    }
    #query
    type Query{
        
        getLatestPost:[Post]!
        getUserInformation(userid:Int!):User!
        getPostCommentById(postid:Int!):[Comment]!
        getLatestPostByUserID(userid:Int!):[Post]!
        getPostInformationById(postid:Int!):Post!
        checkUserLikePost(input:LikeCheckInput!):DidLike!
        #message
        getAllConversation(userid:Int!):[Conversation]!
        getAllMessage(conversationid:Int!):[Message]!

    }
    # like
    input LikeCheckInput{
        userid:Int!
        postid:Int!
    }
    type Like{
        userid:Int!
        postid:Int!
        iconcode:String!
    }
    input LikeInput{
        userid:Int!
        postid:Int!
        iconcode:Int
    }
    #mutation
    type Mutation{
        createComment(input:CommentInput):Comment!
        createLike(input:LikeInput):ReturnLike!
        deleteLike(input:LikeInput):ReturnLike!
        # messaging
        initConversation(input:ConversationInput!):Conversation!
        sendMessage(input:MessageInput!):Message

        
    }
    type ReturnLike{
        change:Boolean!
        status:Boolean!
        
    }
    type Subscription {
        getComment(postid:Int!):Comment!
        # waitMessageOneConversation(input:waitMessageInput):Message!
        waitAllMessage(userid:Int!):Message!

    }
    input waitMessageInput{
        userid:Int!
        conversationid:Int!
    }
    type Conversation {
        conversationid:Int!
        userid1:Int!
        userid2:Int!
        datecreated:String!
        lastactivedate:String!
        lastmessage:Message
    }
    input ConversationInput{
        userid1:Int!
        userid2:Int!
    }
    type Message {
        messageid:Int!
        userid:Int!
        conversationid:Int!
        datecreated:String!
        content:String!
        receiver:Int!
        
    }
    input MessageInput{
        userid:Int!
        conversationid:Int!
        content:String!
        receiver:Int!

    }

   

`

module.exports={typeDefs}