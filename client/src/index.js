import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import UserStore from "./store/UserStore.js";
import WareStore from './store/WareStore.js';


import App from './App';


export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
      user: new UserStore(),
      ware: new WareStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
