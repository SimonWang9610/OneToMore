import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { articleCreators, ArticleState } from "./store/article";


function App() {

  const queryState = useSelector((state: ArticleState) => state.query);
  const mutationState = useSelector((state: ArticleState) => state.mutation);

  const dispatch = useDispatch();

  const queryActions = bindActionCreators(articleCreators.queryCreators, dispatch);

  const mutationActions = bindActionCreators(articleCreators.mutationCreators, dispatch);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
