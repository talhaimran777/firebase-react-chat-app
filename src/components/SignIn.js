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
  }, [user, loading, dispatch, auth, history]);

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
                  var user = result.user;
                  if (user) {
                    // dispatch({ type: 'SET_AUTH', payload: auth });
                    history.push('/chat');
                  }
                  // ...
                })
                .catch((error) => {
                  console.log(error);
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
