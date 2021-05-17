import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from './subcomponents/Spinner';

const SignIn = () => {
  const { firebase, auth } = useSelector((state) => state.firebase);
  // const { currentUser } = auth;

  const [user, loading] = useAuthState(auth);
  // console.log(user, 'From signin');

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user && !loading) {
      history.push('/chat');
    } else {
      dispatch({ type: 'SET_AUTH', payload: auth });
    }
    // if (!loading && currentUser !== null) {
    //   dispatch({ type: 'USER', payload: currentUser });
    //   history.push('/chat');
    // }
    // if (user && !currentUser) {
    //   dispatch({ type: 'SET_AUTH', payload: auth });
    // } else if (currentUser) {
    //   dispatch({ type: 'USER', payload: currentUser });
    //   history.push('/chat');
    // }
  }, [user]);

  const provider = new firebase.auth.GoogleAuthProvider();

  return loading ? (
    <div className='h-screen flex items-center justify-center'>
      <Spinner />
    </div>
  ) : !user ? (
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
                  if (user) {
                    // dispatch({ type: 'SET_AUTH', payload: auth });
                    history.push('/chat');
                  }
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
  ) : (
    ''
  );
};

export default SignIn;
