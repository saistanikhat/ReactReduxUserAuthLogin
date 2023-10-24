import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { fetchUser } from '../actions/userActions';
import Constants from '../constants';

interface UserData {
  data: Array<User> | null;
  loading: boolean;
  error: string | null;
}

interface User {
  id: number;
  email: string;
}

const UserList: React.FC = () => {
  const dispatch = useDispatch<any>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const userData = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUser(token));
  }, [dispatch, token]);

  if (!isAuthenticated || !userData || !userData.data) {
    return null;
  }

  return (
    <div>
      <h2>{Constants.USERLIST}</h2>
      {userData.loading ? (
        <p>{Constants.LOADING}</p>
      ) : userData.error ? (
        <p>Error: {userData.error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th style={{ padding: '5px' }}>{Constants.ID}</th>
              <th style={{ padding: '5px' }}>{Constants.EMAIL}</th>
            </tr>
          </thead>
          <tbody>
            {userData?.data?.data.map((user: User) => (
              <tr key={user.id}>
                <td style={{ padding: '5px' }}>{user.id}</td>
                <td style={{ padding: '5px' }}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
