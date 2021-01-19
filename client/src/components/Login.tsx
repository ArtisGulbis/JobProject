import axios, { AxiosResponse } from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { RootStore } from '../redux/store';
import { setToken } from '../redux/user/userActions';
import Button from './Button';

interface ResponseData {
  error: string;
  username: string;
  token: string;
}

const Login = () => {
  const history = useHistory();
  const userState = useSelector((state: RootStore) => state.currentUser);
  const dispatch = useDispatch();

  if (userState.token) {
    return <Redirect to="/secret" />;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (!values.username) {
            return setErrors({ username: 'Username required!' });
          }
          if (!values.password) {
            return setErrors({ password: 'Password required!' });
          }

          const res: AxiosResponse<ResponseData> = await axios.post('/login', {
            username: values.username,
            password: values.password,
          });

          if (res.data.error) {
            setErrors({ password: res.data.error });
          } else {
            dispatch(setToken(res.data.username, res.data.token));
            history.push('/secret');
          }
        }}
      >
        <Form className="container bg-gradient-to-b from-indigo-400 to-indigo-600 w-96 h-96 rounded flex justify-center items-center shadow-2xl">
          <div className="flex flex-col justify-center items-center">
            <Field
              className="m-4 p-2 block rounded border-red-900 text-indigo-700 focus:ring-2 focus:ring-indigo-900 focus:border-transparent italic"
              type="text"
              placeholder="Username..."
              name="username"
            />
            <Field
              className="m-4 p-2 block rounded border-gray-900 text-indigo-700 focus:ring-2 focus:ring-indigo-900 focus:border-transparent italic"
              type="password"
              name="password"
              placeholder="Password..."
            />
            <ErrorMessage
              name="password"
              component="p"
              className="block text-white"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="block text-white"
            />
            <Button type="submit">log in</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
