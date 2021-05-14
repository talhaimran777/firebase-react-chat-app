// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: '/chat',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   ],
// };

const SignIn = (props) => {
  const { firebase } = props;

  const provider = new firebase.auth.GoogleAuthProvider();
  //   const db = firebase.firestore();

  //   db.collection('users').add({ message: 'From Talha Imran' });
  return (
    <div>
      <h1>Sign In using Google</h1>
      <button
        onClick={() => {
          firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Sign in with google
      </button>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
    </div>
  );
};

export default SignIn;
