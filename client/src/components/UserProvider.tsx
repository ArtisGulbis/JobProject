import React, { useState } from 'react';

interface UserTypes {
  username: string | undefined;
  id: number | undefined;
  logInUser: (username: string, id: number) => void;
  logOutUser: () => void;
}

export const initialValues: UserTypes = {
  username: '',
  id: 0,
  logInUser: () => {},
  logOutUser: () => {},
};

interface User {
  username: string;
  id: number;
}

export const UserContext = React.createContext<UserTypes>(initialValues);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  return (
    <UserContext.Provider
      value={{
        username: user?.username,
        id: user?.id,
        logInUser: (username: string, id: number) => {
          setUser({ username, id });
        },
        logOutUser: () => {
          setUser({ username: '', id: 0 });
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
