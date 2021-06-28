const defaultState = {
  queue: [],
  Conversation: [],
};

const message = (state = defaultState, action) => {
  if (action.type === "addToQueue") {
    return { ...state, queue: [...state.queue, action.payload] };
  } else if (action.type === "popFistElement") {
    console.log("doing");
    return { ...state, queue: [...state.queue].filter((e, i) => i !== 0) };
  } else if (action.type === "addConversation") {
    const old = [...state.Conversation];
    const newState = [
      action.payload,
      ...old.filter((e) => e.conversationid !== action.payload.conversationid),
    ];

    return { ...state, Conversation: newState };
  } else if (action.type === "getAllConversation") {
    return { ...state, Conversation: action.payload };
  }else if (action.type==="openConversation"){
      const id=action.payload
      const old=[...state.Conversation]
      const newState=old.map(e=>{
          if(id===e.conversationid){
              return {...e,state:'open'}
          }
          return e
      })
        
      return {...state,Conversation:newState}
  }else if (action.type==="hideConversation"){

    const id=action.payload
    const old=[...state.Conversation]
    const newState=old.map(e=>{
        if(id===e.conversationid){
            return {...e,state:'hide'}
        }
        return e
    })
      
    return {...state,Conversation:newState}
  }else if (action.type==="closeConversation"){

    const id=action.payload
      const old=[...state.Conversation]
      const newState=old.map(e=>{
          if(id===e.conversationid){
              return {...e,state:'close'}
          }
          return e
      })
        
      return {...state,Conversation:newState}
}
  return state;
};
export default message;
