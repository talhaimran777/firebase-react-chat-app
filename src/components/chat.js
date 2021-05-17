import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';

const Chat = () => {
  const [chat, setChat] = useState('');

  const { auth } = useSelector((state) => state.firebase);

  const { currentUser } = auth;
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'SET_AUTH', payload: auth });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(chat);
  };

  return (
    <div className='h-screen bg-purple-500 flex justify-center items-center px-5 py-3'>
      <div className='rounded flex flex-col h-full bg-white w-full p-5'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-center text-2xl font-bold text-purple-500'>
            ROOM
          </h1>

          <button
            onClick={() => {
              auth.signOut();
              //   dispatch({ type: 'SIGN_OUT' });
              history.push('/');
            }}
            className='text-white py-1 px-6 rounded bg-red-400'
          >
            Sign Out
          </button>
        </div>
        <div id='chat' className='mb-5 bg-gray-200 p-3 flex-1 rounded'>
          hello
        </div>

        <form onSubmit={handleSubmit} className='flex justify-between'>
          <input
            onChange={(e) => {
              setChat((state) => e.target.value);
            }}
            type='text'
            value={chat}
            className='text-gray-600 flex-1 border-4 border-purple-400 rounded py-1 px-3 mr-2'
          />
          <button className='text-purple-600 py-1 px-3 rounded border-purple-400 border-4'>
            Send
          </button>
        </form>
        {/* <button
          onClick={() => {
            auth.signOut();
            //   dispatch({ type: 'SIGN_OUT' });
            history.push('/');
          }}
          className='border-4 p-2'
        >
          Sign Out
        </button> */}
      </div>
    </div>
  );
};

export default Chat;
