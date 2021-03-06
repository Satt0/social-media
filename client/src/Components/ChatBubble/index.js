import React from "react";
import styles from "./ChatBubble.module.scss";
import Avatar from "../Avatar";
import {Link} from 'react-router-dom'
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Query from "src/lib/API/Apollo/Queries";
import MinimizeIcon from "@material-ui/icons/Minimize";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "src/lib/hooks/useColor";
import { Badge, withStyles, useMediaQuery } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 0,

    top: 40,
    transform: "unset",
  },
}))(Badge);
export default function ChatBubble({ conversation, newMessage }) {
  const dispatch = useDispatch();
  const onOpen = (data) => {
    const id = data.conversationid;
    dispatch({ type: "openConversation", payload: id });
  };
  const onHide = (id) => {
    dispatch({ type: "hideConversation", payload: id });
  };
  const onClose = (id) => {
    dispatch({ type: "closeConversation", payload: id });
  };
  return (
    <div className={styles.container}>
      <div className={styles.chatGroups}>
        {conversation
          .filter((e) => e.state !== "close")
          .map((e, i) => (
            <ChatDialog
              newMessage={newMessage}
              onClose={onClose}
              onHide={onHide}
              key={"chat-" + i}
              thisEl={e}
            />
          ))}
      </div>
      <div className={styles.bubbleContainer}>
        {conversation
          .filter((e) => e.state === "hide")
          .map((c, i) => (
            <Conversation
              newMessage={newMessage}
              handleOpen={onOpen}
              data={c}
              key={"cvst-" + c.conversationid}
            />
          ))}
      </div>
    </div>
  );
}

const Conversation = ({ data, handleOpen, newMessage }) => {
  const [message, setMessage] = React.useState(null);
  const getUserLazy = useLazyQuery(Query.GET_USER_INFORMATION);
  const userid = useSelector((state) => parseInt(state.user.uid));
  const [messageCount, setCount] = React.useState(0);
  React.useEffect(() => {
    const { userid1, userid2 } = data;

    const otherid = userid === userid1 ? userid2 : userid1;
    getUserLazy[0]({ variables: { id: otherid } });
  }, [data, userid]);

  React.useEffect(() => {
    const isThisConver =
      newMessage?.waitAllMessage.conversationid === data?.conversationid;

    if (
      isThisConver &&
      newMessage.waitAllMessage.messageid !== message?.messageid
    ) {
      setMessage(newMessage.waitAllMessage);

      setCount((c) => c + 1);
    }
  }, [newMessage, data, message]);
  React.useEffect(() => {
    setCount(0);
  }, []);
  return (
    <div
      className={styles.bubbleItem}
      onClick={() => {
        handleOpen(data);
        setCount(0);
      }}
    >
      <StyledBadge
        badgeContent={messageCount < 9 ? data?.count : "9+"}
        color="secondary"
      >
        <Avatar
          userAvatar={getUserLazy[1]?.data?.getUserInformation.picture}
          size="medium"
        />
      </StyledBadge>
    </div>
  );
};

const ChatDialog = ({ onHide, thisEl, onClose, newMessage }) => {
  const [message, setMessage] = React.useState([]);
  const userid = useSelector((state) => parseInt(state.user.uid));
  const [sendMessage] = useMutation(Query.SEND_MESSAGE);
  const getUserLazy = useLazyQuery(Query.GET_USER_INFORMATION);
  const [userState, setUserState] = React.useState({});
  const [inputVal, setVal] = React.useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const bodyRef = React.useRef(null);
  const getAllComment = useQuery(Query.GET_CONVERSATION_MESSAGE, {
    variables: { id: thisEl.conversationid },
    fetchPolicy: "no-cache",
  });
  // load on mount
  React.useEffect(() => {
    const { data } = getAllComment;

    if (data?.getAllMessage) {
      const newArr = [...data.getAllMessage];
      setMessage((s) => [...newArr]);
    }
  }, [getAllComment]);

  React.useEffect(() => {
    const isThisConver =
      newMessage?.waitAllMessage.conversationid === thisEl.conversationid;
    if (isThisConver) {
      if (message.length > 0) {
        if (
          newMessage?.waitAllMessage.messageid !==
          message[message.length - 1]?.messageid
        ) {
          setMessage((c) => [...c, newMessage.waitAllMessage]);
        }
      } else {
        setMessage([newMessage?.waitAllMessage ?? [...[]]]);
      }
    }
  }, [newMessage, thisEl, message]);
  React.useEffect(() => {
    const { userid1, userid2 } = thisEl;

    const otherid = userid === userid1 ? userid2 : userid1;
    getUserLazy[0]({ variables: { id: otherid } });
  }, [thisEl, userid]);

  React.useEffect(() => {
    if (getUserLazy[1]?.data) {
      setUserState(getUserLazy[1]?.data.getUserInformation);
    }
  }, [getUserLazy]);

  React.useEffect(() => {
    const scrollToBottom = (objDiv) => {
      objDiv.scrollTop = objDiv.scrollHeight;
    };
    scrollToBottom(bodyRef.current);
  }, [message]);
  React.useEffect(() => {
    if (isMobile && thisEl.state === "open") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, thisEl.state]);
  const onSubmit = (e) => {
    e.preventDefault();

    const receiver =
      thisEl.userid1 === userid ? thisEl.userid2 : thisEl.userid1;

    if (receiver && userid) {
      sendMessage({
        variables: {
          userid: userid,
          receiver: receiver,
          conversationid: thisEl.conversationid,
          content: inputVal.length > 0 ? inputVal : "????",
        },
      });
      setVal("");
    }
  };

  return (
    <div
      className={`${styles.chatItem} ${
        thisEl.state === "open" ? styles.chatOpen : styles.chatHidden
      }`}
    >
      {isMobile && userState?.userid?<MobileHeader onClose={()=>{onClose(thisEl.conversationid)}} onHide={()=>{onHide(thisEl.conversationid)}} user={{name:userState?.userfullname,id:userState.userid,picture:userState?.picture}}/>:(
      <div
        className={styles.header}
        style={{ backgroundColor: theme.backgroundPost }}
      >
        <p>{userState?.userfullname || "loading"}</p>

        <div className={styles.buttonWrapper}>
          <MinimizeIcon
            onClick={() => {
              onHide(thisEl.conversationid);
            }}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <CloseIcon
            onClick={() => {
              onClose(thisEl.conversationid);
            }}
          />
        </div>
      </div>)}
      <div className={styles.body} ref={bodyRef}>
        <div className={styles.bodyContent} ref={bodyRef}>
          {message.map((e, i) => (
            <div
              className={styles.commentItem}
              key={"chat-" + e.messageid + " " + thisEl.conversationid}
            >
              <MessageItem
                nextUID={
                  i < message.length - 1
                    ? message[i + 1].userid - userid ===
                      message[i].userid - userid
                    : false
                }
                avatar={userState?.picture || null}
                text={e.content}
                isthisuser={userid === e.userid}
              />
            </div>
          ))}
        </div>
       
      </div>
      <div className={styles.form}>
        <form
          className={
            isMobile && thisEl.state === "open" ? styles.formSticky : ""
          }
          onSubmit={onSubmit}
        >
          <input
            value={inputVal}
            onChange={(e) => {
              setVal(e.target.value);
            }}
            type="text"
            placeholder="enter your message"
          />
          <button
            style={{
              backgroundColor: inputVal.length > 0 ? "" : "transparent",
            }}
            className="button"
            type="submit"
          >
            {inputVal.length > 0 ? "send" : "????"}
          </button>
        </form>
      </div>
    </div>
  );
};
const MobileHeader=({user,onClose,onHide})=>{
  return <div className={styles.mobileHeader}>
      <div  onClick={onHide}>
    <ArrowBackIcon/>
      </div>
      <div onClick={onHide} className={styles.userGroup}>
      <Link to={`/user/${user.id}`}>
      <Avatar userAvatar={user?.picture}/>
        <p>{user?.name}</p></Link>
      </div>
      <div>
    <CloseIcon onClick={onClose}/>
      </div>
  </div>
}
const MessageItem = ({ text, isthisuser, avatar, nextUID }) => {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref?.curent) {
      ref.current.scrollIntoView();
    }
  }, []);
  return (
    <div
      ref={ref}
      className={`${isthisuser ? styles.right : styles.left} ${
        styles.messageGroup
      }`}
    >
      {!isthisuser ? (
        <Avatar blank={nextUID} userAvatar={avatar} size="small" />
      ) : (
        <></>
      )}
      <div>
        <p
          style={
            text.trim() === "????"
              ? {
                  fontSize: "2rem",
                  background: "transparent",
                  boxShadow: "unset",
                }
              : {}
          }
        >
          {text}
        </p>
      </div>
    </div>
  );
};
