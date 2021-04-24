import Head from "next/head";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
export default function HomePage() {
  return (
    <div>
      <Head>
        <titel>Home</titel>
      </Head>

      <Container>
        <Sidebar />
        <IntroContainer>
          <ContainerBox>
            <ContainerTitel>
              <Titel>Welcome To Whatsapp Clone</Titel>
            </ContainerTitel>
            <ContainerTitel>
              <TitelInfo>Technologies For Build</TitelInfo>
            </ContainerTitel>
            <ContainerTechInfo>
              <List>
                <Image src="/next.png" />
                <Image src="/react.png" />
              </List>
              <List>
                <Image src="/firebase.png" />
                <Image src="/vercel.jpg" />
              </List>
              <ContainerTitel>
              <TitelInfo>Condact</TitelInfo>
            </ContainerTitel>
              <UserInfo>
                <a
                  href="https://github.com/abjs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaImages alt="GitHub" src="./github.png" />
                </a>
                <a href="mailto:itsmeabjs@gmail.com">
                  <MediaImages alt="Gmail" src="./gmail.png" />
                </a>
                <a
                  href="https://www.facebook.com/itsmeabjs.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaImages alt="Facebook" src="./fb.png" />
                </a>
                <a
                  href="https://www.instagram.com/itsmeabjs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaImages alt="Instagram" src="./instagram.png" />
                </a>
                <a
                  href="https://www.linkedin.com/in/itsmeabjs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaImages alt="linkedin" src="./linkedin.png" />
                </a>
                <a
                  href="https://dev.to/abjs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaImages alt="linkedin" src="./Dev.png" />
                </a>
                <a
                  href="https://twitter.com/itsmeabjs/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MediaImages alt="Twitter" src="./twitter.png" />
                </a>
              </UserInfo>
            </ContainerTechInfo>
          </ContainerBox>
        </IntroContainer>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
`;
const Titel = styled.p`
  font-weight: bolder;
  text-transform:uppercase;

  font-size: 1rem;
`;
const TitelInfo = styled.p`
  font-weight: bold;
  font-size: .8rem;
  text-transform:uppercase;
  text-align: center;
  margin-top: 10px;
`;
const ContainerBox = styled.div`
  height: 85vh;
  width: 70vh;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 20px;
`;
const ContainerTitel = styled.div`
  height: 6vh;
  display: grid;
  place-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 20px;
  margin: 10px;
`;
const IntroContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  border-radius: 20px;
`;
const UserInfo = styled.div`
  height: 8vh;
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContainerTechInfo = styled.div`
  height: 10vh;
`;
const List = styled.div`
  /* background-color:red;  */
  margin-left: 10px;
  display: flex;
  width: 68vh;
  justify-items: center;
  margin-top: 20px;
`;
const Image = styled.img`
  /* height: 20vh; */
  height: 140px;
  width: 50%;
  margin: 5px 8px 5px 0px;
  display: flex;
  padding: 10px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const MediaImages = styled.img`
  width: 50px;
  margin: 10px;
`;

const StyledAvathr = styled(Avatar)``;
