import './App.css';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
// import { firebaseConfig } from './firebaseConfig';
// import { useEffect } from 'react';
// import { addSimpleDoc } from './firebase';
function App(props) {
  const { firebase } = props;
  return (
    <div className='App'>
      <Switch>
        {/* <Route exact path='/signin' component={SignIn} /> */}

        <Route exact path='/'>
          <SignIn firebase={firebase} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
