import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {useRouter} from "next/router";
import getRecipientEmail from "../utils/getRecipientEmail";
const Chat = ({ id, users }) => {
  const router =useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const RecipientEmail = getRecipientEmail(users, user);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
    const enterChat =()=>{
      router.push(`/chat/${id}`)
    }

  return (
    <div>
      <Container onClick={enterChat}>
        {recipient ? (
          <UserAvatar src={recipient.photoURL} />
        ) : (
          <UserAvatar>{RecipientEmail[0]}</UserAvatar>
        )}
        {/* <p>{process.env.API_KEY}</p> */}
        <p>{RecipientEmail}</p>
      </Container>
    </div>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
  :active{
    background-color:whitesmoke;
  }
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 5px;
  margin-right: 10px;
  :hover {
    opacity: 0.8;
  }
`;
