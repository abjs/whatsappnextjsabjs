import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, timestamp } from "../firebase";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import TimeAgo from "timeago-react";
import {
  AttachFile,
  Call,
  InsertEmoticon,
  Mic,
  MoreHoriz,
} from "@material-ui/icons";
import VideocamIcon from "@material-ui/icons/Videocam";
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useRef, useState } from "react";
import Search from "@material-ui/icons/Search";
import getRecipientEmail from "../utils/getRecipientEmail";

export default function ChatScreen({ chat, message }) {
  const [user] = useAuthState(auth);
  const endOfMessagesRef = useRef(null);
  // console.log(user)
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("message")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: timestamp,
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("message").add({
      timestamp: timestamp,
      message: input,
      user: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });

    // console.log(input);
    setInput("");
    scrollToBottom();
  };
  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const showmessage = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return message.map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const RecipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Header>
        {recipient ? (
          <StyledAvatar src={recipient?.photoURL} />
        ) : (
          <StyledAvatar>{RecipientEmail[0]}</StyledAvatar>
        )}
        <HeaderInformation>
          <h3>{RecipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active....</p>
          )}
          {/* // <p>Last seen....</p> */}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <VideocamIcon />
          </IconButton>
          <IconButton>
            <Call />
          </IconButton>
          <Line />
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showmessage()}
        <EndMessage ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <IconButton>
          <Mic />
        </IconButton>
      </InputContainer>
    </Container>
  );
}
const Container = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  padding: 7px;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 0.8rem;
    color: gray;
  }
`;
const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndMessage = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  bottom: 0;
  outline: none;
  position: sticky;
  background-color: whitesmoke;
  border: none;
  margin-left: 15px;
  margin-right: 15px;
`;
const StyledAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const Line = styled.div`
  border-left: 2px solid gray;
  height: 25px;
`;
