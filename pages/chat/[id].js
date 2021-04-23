import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Chat({ chat, message }) {
  const [user] = useAuthState(auth);
  const messages =JSON.parse(message)
  // console.log(messages);
  return (
    <Container>
      <Head>
        <titel>Chat</titel>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} message={messages}/>
      </ChatContainer>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  const messageRes = await ref
    .collection("message")
    .orderBy("timestamp", "asc")
    .get();
  const message = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }));
  ///PRP chat
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log(chat, message);
  return {
    props: {
      message: JSON.stringify(message),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
  height: 100vh;
  background-color: blue;
`;
