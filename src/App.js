import './App.css';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';

import { firebaseConfig } from './firebaseConfig';

import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const dispatch = useDispatch();

  dispatch({
    type: 'SETUP_FIREBASE',
    payload: {
      firebase,
      auth,
      firestore,
    },
  });

  return (
    <div className='App'>
      <Switch>
        {/* <Route exact path='/signin' component={SignIn} /> */}

        <Route exact path='/'>
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
