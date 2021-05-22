import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from './subcomponents/Spinner';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  let { auth } = useSelector((state) => state.firebase);
  const [user, loading] = useAuthState(auth);
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
