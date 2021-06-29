import React from "react";
import { useSubscription } from "@apollo/client";
import Query from "src/lib/API/Apollo/Queries";
import IconBadge from "../IconBadge";
import style from "./style.module.scss";
import { useQuery } from "@apollo/client";
import ChatBubble from "../ChatBubble";
import { useSelector, useDispatch } from "react-redux";
export default function ChatListener({ userid }) {

  const GlobalConversation = useSelector((state) => state.Message.Conversation);
 

  return (
    <div style={{ position: "relative" }}>
    
      {GlobalConversation && (
        <Listener
          conversation={GlobalConversation}
          userid={userid}
          
        />
      )}
    </div>
  );
}

const Listener = ({ userid, conversation }) => {
  const listener = useSubscription(Query.LISTEN_MESSAGE, {
    variables: { userid },
  });
  //const FirstGlobal=useSelector((s)=>s.Message.Conversation[0]||null)
  const dispatch = useDispatch();
  // React.useState(()=>{
  //   if(listener?.data){
  //     const newMessage = listener.data.waitAllMessage;
  //     console.log('updateing');
  //     dispatch({type:"updateLastMessage",payload:{conversationid:newMessage.conversationid,lastmessage:newMessage.content}})

  //   }
  // },[listener])
  React.useEffect(() => {
    if (listener?.data) {

      const newMessage = listener.data.waitAllMessage;
      const { userid, receiver } = newMessage;
      const newC = {
        conversationid: newMessage.conversationid,

        lastmessage: newMessage.content,
        userid1: Math.min(userid, receiver),
        userid2: Math.max(userid, receiver),
        state: "hide",
      };
      

        dispatch({ type: "addConversation", payload: newC });
      
    }
  }, [listener.data]);

  return (
    <>
      <ChatBubble conversation={conversation} newMessage={listener.data} />
    </>
  );
};
