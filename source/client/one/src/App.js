import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import NavbarPage from "./components/navbar";
import HomeView from "./components/home-view";
import FootPage from "./components/footer";

import Service from "./components/services/Service";
import UAServiceProvider from "./components/services/UAService";
import Storage from "./components/services/Storage";
import ArticleServiceProvider from "./components/services/ArticleService";

function App() {
  const storage = new Storage("");
  const service = new Service(storage);
  const uas = new UAServiceProvider(service);
  const articleService = new ArticleServiceProvider(service);

  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    storage.clear();
  }, []);

  return (
    <div className="App">
      <Router>
        <NavbarPage isAuth={isAuthenticated} auth={uas} storage={storage} setAuth={setAuthenticated} />
        <div>
          <HomeView storage={storage} auth={uas} setAuth={setAuthenticated} content={articleService} isAuth={isAuthenticated}/>
        </div>
        <FootPage />
      </Router>
    </div>
  );
}

export default App;
