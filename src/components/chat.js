import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import Spinner from './subcomponents/Spinner';

const Chat = () => {
  const [input, setInput] = useState('');

  const { auth, firestore, firebase } = useSelector((state) => state.firebase);
  const { loadingChats, conversation } = useSelector((state) => state.chat);

  const { currentUser } = auth;
  const { displayName, uid, photoURL, email } = currentUser;

  const chatRef = firestore.collection('chat');

  const history = useHistory();
  const dispatch = useDispatch();

  // dispatch({ type: 'FETCH_CONVERSATION' });

  // Fetching chats from firestore
  const query = chatRef.orderBy('createdAt').limit(25);

  const [messages, loading, error] = useCollectionData(query, {
    idField: 'id',
  });

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'SET_AUTH', payload: auth });
    }
  }, []);

  useEffect(async () => {
    // console.log(value);
    // dispatch({ type: 'FETCH_CONVERSATION' });
    // // Fetching chats from firestore
    // const query = chatRef.orderBy('createdAt').limit(25);
    // const [messages, error, loading] = useCollectionData(query, {
    //   idField: 'id',
    // });
    // if (messages.length) alert(messages);
    // const result = await firestore.collection('chat').get();
    // let messages = [];
    // result.docs.forEach((doc) => {
    //   messages.push(doc.data());
    // });
    // if (messages.length) {
    //   dispatch({ type: 'SUCCESS_CONVERSATION', payload: messages });
    // } else {
    //   dispatch({ type: 'NO_CONVERSATION' });
    // }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection('chat').add({
      message: input,
      by: displayName,
      email,
      photo: photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // dispatch({ type: 'FETCH_CONVERSATION' });
    // alert(chat);
  };

  return (
    <div className='h-screen bg-purple-500 flex justify-center items-center px-5 py-3'>
      <div className='rounded flex flex-col h-full bg-white w-full p-5'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-center text-3xl font-bold text-purple-500'>
            Chat
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
        <div id='chat' className='mb-5 bg-gray-100 p-3 flex-1 rounded'>
          {loading ? (
            <div className='h-full flex items-center justify-center'>
              <Spinner />
            </div>
          ) : messages ? (
            messages.map((chat) => (
              <div className='mb-4 '>
                <div
                  id='inline'
                  className='ml-auto inline-block py-1 px-3 bg-purple-500 rounded-xl'
                >
                  <p className='text-white text-md font-medium'>
                    {chat.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            ''
          )}
        </div>

        <form onSubmit={handleSubmit} className='flex justify-between'>
          <input
            onChange={(e) => {
              setInput((state) => e.target.value);
            }}
            type='text'
            value={input}
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
