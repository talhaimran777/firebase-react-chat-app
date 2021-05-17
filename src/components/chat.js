import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';

const Chat = () => {
  const { auth } = useSelector((state) => state.firebase);

  const { currentUser } = auth;
  console.log(currentUser);
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'SET_AUTH', payload: auth });
    }
  }, []);
  return (
    <div>
      <h2>Room Chat</h2>
      <button
        onClick={() => {
          auth.signOut();
          //   dispatch({ type: 'SIGN_OUT' });
          history.push('/');
        }}
        className='border-4 p-2'
      >
        Sign Out
      </button>
    </div>
  );
};

export default Chat;
