import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from './subcomponents/Spinner';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  let { auth } = useSelector((state) => state.firebase);
  // const dispatch = useDispatch();

  let { currentUser } = auth;

  //   const dispatch = useDispatch();

  //   if (!loading && !currentUser) {
  //     currentUser = user;
  //   }
  const [user, loading] = useAuthState(auth);
  // console.log(currentUser);
  // if (user && currentUser == null) {
  //   console.log('We need to manually set auth here!');
  // }
  // if (user && !loading) {
  //   if (!currentUser) {
  //     currentUser = user;
  //   }
  // }
  // useEffect(() => {
  //   dispatch({ type: 'SET_AUTH', payload: auth });
  // }, [currentUser]);

  //   console.log(user);
  //   if (user && !loading) {
  //     dispatch({
  //       type: 'SET_AUTH',
  //       payload: auth,
  //     });
  //   }
  //   useEffect(() => {}, []);

  //   console.log(user);
  //   const [cookies] = useCookies(['user']);
  //   const { user } = cookies;
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div className='h-screen flex items-center justify-center'>
            <Spinner />
          </div>
        ) : user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};
