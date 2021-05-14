import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
const SignIn = () => {
  const { firebase, auth } = useSelector((state) => state.firebase);

  const [user] = useAuthState(auth);
  const provider = new firebase.auth.GoogleAuthProvider();

  // console.log(user);

  // const { displayName, email } = user;
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='text-center bg-purple-400 py-5 px-10 rounded'>
        <h1 className=' font-bold text-2xl text-white mb-3'>
          Sign In using Google
        </h1>

        <div className=''>
          <button
            className='font-medium  rounded bg-white text-purple-400 py-2 px-7'
            onClick={() => {
              auth
                .signInWithPopup(provider)
                .then((result) => {
                  /** @type {firebase.auth.OAuthCredential} */
                  var credential = result.credential;

                  // This gives you a Google Access Token. You can use it to access the Google API.
                  var token = credential.accessToken;
                  // The signed-in user info.
                  var user = result.user;
                  // ...
                })
                .catch((error) => {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
            }}
          >
            Sign In
          </button>
        </div>
      </div>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
    </div>
  );
};

export default SignIn;
