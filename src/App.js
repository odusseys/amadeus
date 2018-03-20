import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from 'store';
import logo from './logo.svg';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
