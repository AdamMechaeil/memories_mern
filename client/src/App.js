import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { NavBar } from './components/Navbar/NavBar';
import useStyles from './styles';
import Auth from './components/Auth/Auth';

const App = () => {

  return (

    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>

    
    </BrowserRouter>
  );
}

export default App;
