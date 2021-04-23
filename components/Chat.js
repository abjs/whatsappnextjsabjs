import { Avatar } from "@material-ui/core";
import styled from "styled-components";
const Chat = ({ id, user }) => {
  return (
    <div>
      <Container>
        <UserAvatar />
        {/* <p>{process.env.API_KEY}</p> */}
        <p>{process.env.NEXT_PUBLIC_PROJECT_ID}</p>
        {/* <p>Chat Component</p> */}
      </Container>
    </div>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
 padding: 15px;
 word-break:break-word;
 :hover {
     background-color:#e9eaeb;
 }
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  margin:5px;
  margin-right:10px;
  :hover {
    opacity: 0.8;
  }
`;
