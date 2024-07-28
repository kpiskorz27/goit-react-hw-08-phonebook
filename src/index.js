import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from 'components/App';
import store from './store';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import { login } from './slices/authSlice';

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(login.fulfilled({ token }));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/goit-react-hw-08-phonebook">
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>
);
