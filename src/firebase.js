import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const addSimpleDoc = async () => {
  //   await db.collection('users').add({
  //     name: 'Talha Imran',
  //     age: 23,
  //   });
  //   console.log(doc);

  let usersRef = db.collection('users');

  await usersRef.doc('Talha Imran').set({ gender: 'Male', age: 23 });
};

// db.collection('users')
//   .add({
//     name: 'Talha Imran',
//     age: 23,
//   })
//   .then((doc) => console.log(doc))
//   .catch((err) => console.error(err));

// console.log(firebaseConfig);
