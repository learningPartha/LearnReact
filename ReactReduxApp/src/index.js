import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import './index.css';
import configureStore from './redux/ConfigureStore';
import { Provider as ReduxProvider } from 'react-redux';

//pass initial state to store if server rending, else initialize redux store with data from local storage
const store = configureStore();

render(
  <ReduxProvider store={store}>
    {/*since wrapping with provider our App can access Redux store */}
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app')
);
