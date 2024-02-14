import { app } from './firebase-config.js';

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from './firebase-config.js';

const form = document.getElementById('form');
const googleLoginBtn = document.getElementById('google-login');
const githubLoginBtn = document.getElementById('github-login');

// Login with Email and Password
const handleLoginWithEmailAndPassword = (e) => {
  e.preventDefault();

  const userEmail = document.getElementById('email');
  const userPw = document.getElementById('password');

  const auth = getAuth();
  signInWithEmailAndPassword(auth, userEmail.value.trim(), userPw.value.trim())
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      alert('Success!');
      window.location.href = './index.html';
      // ...
    })
    .catch((error) => {
      alert('Failure!');
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// Login with Providers
const handleLoginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const auth = getAuth();

  auth.useDeviceLanguage();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      alert('Google Login Success!');
      window.location.href = './index.html';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      alert('Google Login Failure!');
    });
};

const handleLoginWithGithub = () => {
  const provider = new GithubAuthProvider();
  provider.addScope('repo');
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      alert('Github Login Success!');
      window.location.href = './index.html';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...

      console.log(error);

      alert('Github Login Failure!');
    });
};

form.addEventListener('submit', handleLoginWithEmailAndPassword);
googleLoginBtn.addEventListener('click', handleLoginWithGoogle);
githubLoginBtn.addEventListener('click', handleLoginWithGithub);
