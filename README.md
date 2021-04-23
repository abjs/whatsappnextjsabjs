# Whatsapp Clone With NextJS

you can use the code for testing only you need to do is to add an Environment variable



API_KEY=[]

AUTH_DOMAIN=

NEXT_PUBLIC_PROJECT_ID=

STORAGE_BUCKET=

MESSAGING_SENDER_ID=

APP_ID=1:

MEASUREMENT_ID=

MEASUREMENT_ID=


or 

in firebase.js file 

 https://github.com/abjs/whatsappnextjsabjs/blob/main/firebase.js

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  
  authDomain: process.env.AUTH_DOMAIN,
  
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  
  storageBucket: process.env.STORAGE_BUCKET,
  
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  
  appId: process.env.APP_ID,
  
  measurementId: process.env.MEASUREMENT_ID,

};

this with your firebaseConfig
