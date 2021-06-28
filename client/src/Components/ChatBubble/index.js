import React from 'react'
import styles from './ChatBubble.module.scss'
import Avatar from '../Avatar'
import { useLazyQuery, useMutation,useQuery } from '@apollo/client'
import Query from 'src/lib/API/Apollo/Queries'
import { useSelector ,useDispatch} from 'react-redux'
import { useTheme } from 'src/lib/hooks/useColor'
import { Badge,withStyles } from '@material-ui/core'
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 0,
        
        top: 40,
      transform:"unset",
    },
  }))(Badge);
export default function ChatBubble({conversation,newMessage}) {
    const  dispatch = useDispatch()
    const onOpen=(data)=>{
        const id=data.conversationid
        dispatch({type:"openConversation",payload:id})
       
    }
    const onHide=(id)=>{
            dispatch({type:"hideConversation",payload:id})
    }
    const onClose=(id)=>{
        dispatch({type:"closeConversation",payload:id})
    }
    return (
        <div className={styles.container}>

<div className={styles.chatGroups}>
                        {conversation.filter(e=>e.state!=='close').map((e,i)=><ChatDialog newMessage={newMessage} onClose={onClose} onHide={onHide} key={"chat-"+i} thisEl={e}/>)}

                </div>
                <div className={styles.bubbleContainer}>
                {conversation.map((c,i)=> <Conversation newMessage={newMessage} handleOpen={onOpen} data={c} key={"cvst-"+c.conversationid}  />)}

                </div>
                
        </div>
    )
}

const Conversation=({data,handleOpen,newMessage})=>{
    const [message,setMessage]=React.useState(null)
    const getUserLazy=useLazyQuery(Query.GET_USER_INFORMATION)
    const userid=useSelector(state=>parseInt(state.user.uid))
    const [messageCount,setCount]=React.useState(0)
    React.useEffect(()=>{
        const {userid1,userid2}=data

            const otherid=userid===userid1?userid2:userid1
           getUserLazy[0]({variables:{id:otherid}})
    },[data,userid])


    React.useEffect(()=>{
        const isThisConver=newMessage?.waitAllMessage.conversationid===data?.conversationid
     if(isThisConver && newMessage.waitAllMessage.messageid!==message?.messageid){
         
        setMessage(newMessage.waitAllMessage)
        if(data.state!=='open'){
            setCount(c=>c+1)
        }else{
            setCount(0)
        }
        
     }
    },[newMessage,data,message])
    React.useEffect(()=>{
        if(data.state==='open'){
            setCount(0)
        }
    },[data.state])
    return <div className={styles.bubbleItem} onClick={()=>{handleOpen(data);}}>
<StyledBadge badgeContent={messageCount<9?messageCount:"9+"} color="secondary">
<Avatar userAvatar={getUserLazy[1]?.data?.getUserInformation.picture}  size="medium"/>

    </StyledBadge>        
    </div>
}

const ChatDialog=({onHide,thisEl,onClose,newMessage})=>{
    const [message,setMessage]=React.useState([])
    const userid=useSelector(state=>parseInt(state.user.uid))
    const [sendMessage, { data }] = useMutation(Query.SEND_MESSAGE);
    const getUserLazy=useLazyQuery(Query.GET_USER_INFORMATION)
    const [userState,setUserState]=React.useState({})
    const [inputVal,setVal]=React.useState('')
    const theme=useTheme()
    const bodyRef=React.useRef(null)
       const getAllComment = useQuery(Query.GET_CONVERSATION_MESSAGE,{variables:{id:thisEl.conversationid},fetchPolicy:"no-cache"});
// load on mount
    React.useEffect(()=>{
            const {data}=getAllComment
            
            if(data?.getAllMessage){
                    const newArr=[...data.getAllMessage]
                setMessage(s=>([...newArr]))
            }
    },[getAllComment])
    // update after send message
    React.useEffect(()=>{
        if(data?.sendMessage){
            const update=data.sendMessage

            setMessage(s=>{
                    if(s.length>0){
                        if(update.messageid!==s[s.length-1].messageid){
                            return [...s,update]
                        }
                        return s
                    }
                    return [update]
            })
        }
    },[data])
    React.useEffect(()=>{
        const isThisConver=newMessage?.waitAllMessage.conversationid===thisEl.conversationid
     if(isThisConver){
         if(message.length>0){
             if(newMessage?.waitAllMessage.messageid!==message[message.length-1]?.messageid)
             {

                 setMessage(c=>([...c,newMessage.waitAllMessage]))
             }
         }else{
             setMessage([newMessage?.waitAllMessage??[...[]]])
         }
       
        
     }
    },[newMessage,thisEl])
    React.useEffect(()=>{
        const {userid1,userid2}=thisEl

            const otherid=userid===userid1?userid2:userid1
           getUserLazy[0]({variables:{id:otherid}})
    },[thisEl,userid])

    React.useEffect(()=>{
        if(getUserLazy[1]?.data){
            setUserState(getUserLazy[1]?.data.getUserInformation)
        }
    },[getUserLazy])
   
 React.useEffect(()=>{
    const scrollToBottom=(objDiv)=>{
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    scrollToBottom(bodyRef.current)
 },[message])

    const onSubmit=(e)=>{
        e.preventDefault()
       if(inputVal.length>0){
        const receiver=thisEl.userid1===userid?thisEl.userid2:thisEl.userid1
        
       if(receiver&&userid){
        sendMessage({variables:{userid:userid,receiver:receiver,conversationid:thisEl.conversationid,content:inputVal}})
        setVal('')
       }
       }
    }

    return <div className={`${styles.chatItem} ${thisEl.state==="open"?styles.chatOpen:styles.chatHidden}`}>
            <div className={styles.header} style={{backgroundColor:theme.backgroundPost}}>
                <p>{userState?.userfullname||"loading"}</p>
                <button  className="button" onClick={()=>{onHide(thisEl.conversationid)}}>hide</button>
                <button className="button" onClick={()=>{onClose(thisEl.conversationid)}}>close</button>
            </div>
            <div className={styles.body} ref={bodyRef}>
                <div className={styles.bodyContent} ref={bodyRef}>
                {message.map(e=><div className={styles.commentItem} key={"chat-"+e.messageid+' '+thisEl.conversationid}><MessageItem avatar={userState?.picture||null} text={e.content} color={userid===e.userid}/></div>)}
                </div>
                        {/* <div  className={styles.scrollToBottom}></div> */}
            </div>
            <div className={styles.form}>
                <form onSubmit={onSubmit}>
                    <input value={inputVal} onChange={(e)=>{setVal(e.target.value)}} type="text" required placeholder="enter your message"/>
                    <button  className="button" type="submit">send</button>
                </form>
            </div>
    </div>
}

const MessageItem=({text,color,avatar})=>{
    const ref=React.useRef()
    React.useEffect(()=>{
          if(ref?.curent){
                ref.current.scrollIntoView()
          }  
    },[])
return <div ref={ref} className={`${color?styles.right:styles.left} ${styles.messageGroup}`}>
    {!color?<Avatar userAvatar={avatar} size="small"/>:<></>}
   <div>
   <p>{text}</p>
   </div>
    
    
    </div>
}