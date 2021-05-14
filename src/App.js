import './App.css';
// import { firebaseConfig } from './firebaseConfig';
import { useEffect } from 'react';
import { addSimpleDoc } from './firebase';
function App() {
  // console.log(firebaseConfig);

  useEffect(() => {
    addSimpleDoc();
  }, []);
  return (
    <div className='App'>
      <h1>Building a chat app with react & firebase</h1>
    </div>
  );
}

export default App;
