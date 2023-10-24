import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store/configureStore';
import Login from './components/Login';
import UserList from './components/UserList';
import wissenlogo from './assets/wissenlogo.png';
import Hello from './Hello';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-sm-5 mb-5 mt-5">
        <img src={wissenlogo} alt="wissenlogo" />
        <Hello />
        <Login />
        <UserList />
        <ToastContainer />
      </div>
    </Provider>
  );
};

export default App;
