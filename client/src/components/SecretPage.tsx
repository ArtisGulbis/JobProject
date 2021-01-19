import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootStore } from '../redux/store';
import { removeToken } from '../redux/user/userActions';
import Button from './Button';

const SecretPage = () => {
  const userState = useSelector((state: RootStore) => state.currentUser);
  const dispatch = useDispatch();

  if (!userState.token) {
    return <Redirect to="/" />;
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-9/12 h-1/4 mx-auto bg-indigo-300 shadow-lg rounded flex flex-col justify-evenly items-center">
        <p className="text-indigo-900 w-full h-1/4 text-5xl text-center">
          Welcome to the most secret page ever,{' '}
          <span className="capitalize">{userState.username}!</span>
        </p>
        <Button onClick={() => dispatch(removeToken())}>log out</Button>
      </div>
    </div>
  );
};

export default SecretPage;
