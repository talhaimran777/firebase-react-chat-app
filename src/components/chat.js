import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Spinner from './subcomponents/Spinner';
import SendIcon from '@material-ui/icons/Send';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const Chat = () => {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const [input, setInput] = useState('');

  const { auth, firestore, firebase } = useSelector((state) => state.firebase);
  const { lastDoc, conversation, total, loaded } = useSelector(
    (state) => state.chat
  );

  const { currentUser } = auth;
  const { displayName, uid, photoURL, email } = currentUser;
  const chatRef = firestore.collection('chat');
  const history = useHistory();
  const dispatch = useDispatch();

  // alert('UID: ' + uid);
  // dispatch({ type: 'FETCH_CONVERSATION' });

  // Fetching chats from firestore
  const query = chatRef.orderBy('createdAt', 'desc').limit(20);

  const [messages, loading] = useCollectionData(query, {
    idField: 'id',
  });

  const setTotalFunc = () => {
    let totalMessages = 0;
    chatRef.get().then((snapshot) => {
      // dispatch({type: 'SET_LOADED'});
      totalMessages = snapshot.docs.length;
      // alert(totalMessages);

      dispatch({ type: 'SET_TOTAL', payload: totalMessages });
    });
  };
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: 'SET_AUTH', payload: auth });
    }
    // we gonna implement logic: if full loaded chat don't show load more chat button
    setTotalFunc();

    scrollToBottom();
  }, []);
  useEffect(() => {
    query.get().then((snapshot) => {
      let lastDocRef = snapshot.docs[snapshot.docs.length - 1];

      dispatch({ type: 'SET_LAST_DOC', payload: lastDocRef });

      if (!loading) {
        dispatch({ type: 'SET_CHAT', payload: messages.reverse() });
        scrollToBottom();
      }
    });
  }, [messages]);

  useEffect(() => {
    if (conversation) {
      dispatch({
        type: 'SET_LOADED_MESSAGES',
        payload: conversation.length,
      });
    }
  }, [conversation]);

  const scrollToBottom = () => {
    scrollRef.current?.scroll({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   if (!loading) {
  //     scrollToBottom();
  //   }
  // }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input !== '') {
      setInput(() => '');
      inputRef.current.focus();

      // const time = firebase.firestore.FieldValue.serverTimestamp();
      await firestore.collection('chat').add({
        userID: uid,
        message: input,
        by: displayName,
        email,
        photo: photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        time: moment().format('hh:mm a'),
      });

      setTotalFunc();
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='rounded flex flex-col h-full bg-white w-full p-5'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-center text-3xl font-bold text-purple-500'>
            Chat
          </h1>

          <div>
            {total > loaded && loaded === 20 ? (
              <button
                onClick={() => {
                  let next = chatRef
                    .orderBy('createdAt', 'desc')
                    .startAfter(lastDoc)
                    .limit(20);

                  next.get().then((snapshot) => {
                    let lastDocRef = snapshot.docs[snapshot.docs.length - 1];
                    dispatch({ type: 'SET_LAST_DOC', payload: lastDocRef });
                  });

                  let retrievedMessages = [];
                  next.get().then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                      retrievedMessages.push(doc.data());
                    });
                    dispatch({
                      type: 'SET_NEW_CHAT',
                      payload: {
                        prevChat: conversation,
                        newChat: retrievedMessages.reverse(),
                      },
                    });
                  });
                }}
                className='bg-purple-400 text-white py-1 px-3 rounded mr-2'
              >
                <AutorenewIcon />
              </button>
            ) : (
              ''
            )}

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
          ) : conversation && conversation.length ? (
            conversation.map((chat) => (
              <div key={chat.id} className='mb-10 '>
                <div className='flex mb-2'>
                  <div
                    className={`inline-flex items-center ${
                      uid === chat.userID ? 'ml-auto' : ''
                    }`}
                  >
                    <img
                      className='mr-3 rounded-full'
                      src={chat.photo}
                      height='50px'
                      width='50px'
                      alt=''
                    />

                    <div
                      className={`${
                        uid === chat.userID ? 'text-right' : 'text-left'
                      }`}
                    >
                      <p className='text-sm font-medium text-purple-400'>
                        @{chat.by}
                      </p>
                      <div
                        id='inline'
                        className={`ml-auto inline-block py-1 px-3 rounded-xl ${
                          uid === chat.userID ? 'bg-gray-400' : 'bg-purple-400'
                        }`}
                      >
                        <p className={`text-md font-medium text-white`}>
                          {chat.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`flex  ${
                    uid === chat.userID ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <p className=' text-purple-400 text-xs'>{chat.time}</p>
                </div>
              </div>
            ))
          ) : conversation && messages && conversation.length >= 1 ? (
            <h1 className='text-center text-xl font-bold text-purple-500'>
              Send a message!
            </h1>
          ) : (
            ''
          )}
        </div>

        <form onSubmit={handleSubmit} className='flex justify-between'>
          <input
            onChange={(e) => {
              setInput((state) => e.target.value);
            }}
            ref={inputRef}
            type='text'
            value={input}
            className='text-gray-600 w-full mr-2 border-4 border-purple-400 rounded py-1 px-3'
          />
          <button className='text-purple-400 flex-1 py-1 px-3 rounded border-purple-400 border-4'>
            <SendIcon />
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
