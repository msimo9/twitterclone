// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAgPCQe1XEDmT3dux7ioJGYz0MLmYeoZ7g",

  authDomain: "twitterclone-cbd8e.firebaseapp.com",

  projectId: "twitterclone-cbd8e",

  storageBucket: "twitterclone-cbd8e.appspot.com",

  messagingSenderId: "1064576074502",

  appId: "1:1064576074502:web:b163bc0ef8db3f77d7d487"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

