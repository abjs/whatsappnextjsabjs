import {useEffect} from 'react'
import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, GoogleAuthProvider } from "../firebase";
import {useRouter} from "next/router";
function login() {
  const router =useRouter();
  const Sigin = () => {
    auth
      .signInWithPopup(GoogleAuthProvider)
      .then((e) => {
        console.log("Google Sign In With Popup Sussess");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    router.push(`/`)
  }, [])
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <LoginContainer>
          <Logo src="/logo.png" alt="Logo" />
          <SidebarButton onClick={Sigin}>Sigin In With Google</SidebarButton>
        </LoginContainer>
      </Container>
    </>
  );
}

export default login;
const Container = styled.div`
  display: grid;
  /* place-items:center; */
  align-items: center;
  justify-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const LoginContainer = styled.div`
  display: flex;
  padding: 100px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  /* box-shadow:0px 4px 14px -3px rgba(0,0,0,.7); */
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px; */
  /* box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px; */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const Logo = styled.img`
  height: 250px;
  width: 250px;
  margin-bottom: 50px;
`;
const SidebarButton = styled(Button)`
  &&& {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bolder;
  }
`;
