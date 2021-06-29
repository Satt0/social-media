import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import { useSelector,useDispatch } from "react-redux";
import { useQuery,useLazyQuery } from "@apollo/client";  
import Query from "src/lib/API/Apollo/Queries";
import styles from "./Navbar.module.scss";
import UserAvatar from 'src/Components/Avatar'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
   
   
    backgroundColor: theme.palette.background.paper,
  },
}));
function MessageHistoryItem({conversation,thisUser}){
    const [getData,response] = useLazyQuery(Query.GET_USER_INFORMATION);
    const [user,setUser]=React.useState({})
    const  dispatch = useDispatch()
   React.useEffect(()=>{
       if(conversation.conversationid){
           const {userid1,userid2}=conversation
            const otherUser=userid1===thisUser?userid2:userid1;
            getData({variables:{id:parseInt(otherUser)}})
       }
   },[conversation.conversationid,conversation.userid1,conversation.userid2,thisUser])

   const handleClick=()=>{
    dispatch({type:"addConversation",payload:{...conversation,state:'open',force:true}})



   }
   React.useEffect(()=>{
    ;
    if(response?.data){
        setUser(response.data.getUserInformation)
    }
   },[response])
    return <div className={styles.wrapper}>
    <ListItem onClick={handleClick}>
        <ListItemAvatar>
          <Avatar>
            <UserAvatar userAvatar={user.picture} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={user.userfullname} secondary={conversation.lastmessage} />
      </ListItem>
    </div>
}
function FolderList({data,onClose}) {
  const classes = useStyles();
  const userid=useSelector(state=>parseInt(state.user.uid))


  return (<div onClick={onClose}>
      <List className={classes.root}>
      {data.map(item=>(<MessageHistoryItem key={"history-dropdown-"+item.conversationid} thisUser={userid} conversation={item}/>))}
      
    </List>
  </div>
  
  );
}

const MessageHistory=({userid})=>{
    const Conversation=useSelector(state=>state.Message.Conversation)
    const GetLatestConversation=useQuery(Query.GET_ALL_CONVERSATION,{variables:{userid:parseInt(userid)}})
    const [history,setHistory]=React.useState([])
    const [open,setOpen]=React.useState(false)
    React.useEffect(()=>{
        const {data}=GetLatestConversation
        if(data){
          setHistory(s=>[...s,...data.getAllConversation])
        }
    },[GetLatestConversation])
    React.useEffect(()=>{
        setHistory(s=>{
            const NewState=[...Conversation]
            s.forEach(conver=>{
              const found=NewState.findIndex((e=>e.conversationid===conver.conversationid))
              if(found<0){
                NewState.push(conver)
              }
            })

          return NewState
        })

    },[Conversation])
    
 return <div className={styles.messageHistory}>
   <div tabIndex={1} onClick={()=>{setOpen(s=>!s)}}>
<QuestionAnswerOutlinedIcon/>
   </div>
    <div className={styles.dropdown}>
       {open&& <FolderList onClose={()=>{setOpen(false)}} data={history} />}
    </div>
  </div>
}

export default MessageHistory