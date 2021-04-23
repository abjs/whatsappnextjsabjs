import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import  Chat  from "./Chat";
const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);
  // console.log(chatSnapshot);
  const createChat = () => {
    const input = prompt(
      "Please enter an emale address for the user you wish to chat with"
    );
    if (!input) return;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      console.log("valid");
      //Add email to user db
      db.collection("chats").add({
        users: [input, user.email],
      });
    } else if (chatAlreadyExists(input)) console.log(input, "alrady exits");
    else console.log("invalid");
  };
  const chatAlreadyExists = (recipiendEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((users) => users === recipiendEmail)?.length > 0
    );

  return (
    <div>
      <Container>
        <Header>
          <StyledAvatar onClick={() => auth.signOut()} />
          <IconsContainer>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </IconsContainer>
        </Header>
        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search" />
        </Search>
        <SidebarButton onClick={createChat}>Start New Chat </SidebarButton>
        {/* List of Chat */}
        {
          chatSnapshot?.docs.map((chat) =>(
            <Chat key={chat.id} id={chat.id} user={chat.data().users} />
          ))
        }
      </Container>
    </div>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 30vw;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  background-color: white;
  color: white;
  height: 10vh;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 2px solid gray;
  background-color: whitesmoke;
`;
const StyledAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  padding: 15px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  margin-left: 5px;
  border: none;
  outline: none;
  flex: 1;
  padding: 10px;
  border-radius: 10px;
`;
const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    text-transform: capitalize;
    border-top: 2px solid whitesmoke;
    border-bottom: 2px solid whitesmoke;
  }
`;
const IconsContainer = styled.div``;
export default Sidebar;
