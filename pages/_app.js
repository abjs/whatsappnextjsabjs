import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth,db,timestamp} from '../firebase'
import Login from './login';
import Loading from '../components/Loading';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);
  // console.log(user)
  useEffect(() => {
      if(user){
        db.collection('users').doc(user.uid).set({
          email:user.email,
          lastSeen:timestamp,
          photoURL:user.photoURL,
          displayName:user.displayName,
          emailVerified:user.emailVerified
        },
        {merge:true}
        )
        if(user.emailVerified){
          db.collection('email').doc(user.email).set({
            photoURL:user.photoURL,
            displayName:user.displayName,
          },
          {merge:true}
          )
        }
      }
  }, [user]);

  if (loading) return <Loading/>
  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp
