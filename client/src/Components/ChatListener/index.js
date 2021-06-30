import React from "react";
import { useSubscription } from "@apollo/client";
import Query from "src/lib/API/Apollo/Queries";
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
  const dispatch = useDispatch();
 
  React.useEffect(() => {
    if (listener?.data) {

      const newMessage = listener.data.waitAllMessage;
      const { userid, receiver } = newMessage;
      const newC = {
        conversationid: newMessage.conversationid,

        lastmessage: newMessage.content,
        userid1: Math.min(userid, receiver),
        userid2: Math.max(userid, receiver),
        count:1,
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
