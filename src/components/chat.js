import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Spinner from './subcomponents/Spinner';

const Chat = () => {
  const scrollRef = useRef(null);

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

  console.log(messages);
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'SET_AUTH', payload: auth });
    }
  }, []);

  const scrollToBottom = () => {
    scrollRef.current?.scroll({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(async () => {
    scrollToBottom();
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
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const time = firebase.firestore.FieldValue.serverTimestamp();
    await firestore.collection('chat').add({
      message: input,
      by: displayName,
      email,
      photo: photoURL,
      createdAt: moment().format('hh:mm a'),
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
        <div
          style={{ height: '100%', overflowY: 'scroll' }}
          ref={scrollRef}
          id='chat'
          className='pt-10 bg-gray-100 p-3 flex-1 rounded'
        >
          {loading ? (
            <div className='h-full flex items-center justify-center'>
              <Spinner />
            </div>
          ) : messages ? (
            messages.map((chat) => (
              <div className='mb-10 '>
                <div className='flex'>
                  <div className='inline-flex items-center ml-auto'>
                    <img
                      className='mr-3 rounded-full'
                      src={chat.photo}
                      height='50px'
                      width='50px'
                      alt=''
                    />

                    <div className='text-right'>
                      <p className='text-sm font-medium text-purple-400'>
                        @{chat.by}
                      </p>
                      <div
                        id='inline'
                        className='ml-auto inline-block py-1 px-3 bg-purple-500 rounded-xl'
                      >
                        <p className='text-white text-md font-medium'>
                          {chat.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex justify-end'>
                  <p className='ml-auto text-purple-400 text-xs'>
                    {chat.createdAt}
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
