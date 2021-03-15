import React from 'react';
// { useState, useEffect } 
// import logo from './logo.svg';
import './App.css';
// import api from './apiCalls.js';
import Form from './components/New';
import Home from './components/Home';
import Edit from './components/Edit';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";



export default function App() {
  
  // // const [users, setUsers] = useState([])
  // const [books, getBooks] = useState([])
  // // const [thing, setThing] = useState([])
  // // const [doneFetch, setDoneFetch] = useState(false)
  
  // useEffect(async () => {
  //   // setUsers(await api.getUsers());
  //   getBooks(await api.getBooks());
    // setDoneFetch(true);
  // }, []);

  // const getThing = (t) =>{
  //   setThing(t);
  // }
  
  // const bookList = books.map(book =>
  //   <li key = {book.Book_ID}>{book.Title}</li>)

  return (
    <Router>
      <div>
        <nav style={{position:'fixed', top:0, left:0, width:"100%"}}>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active" activeStyle={{fontWeight: "bold", background: "green"}}>Current JHAs</NavLink>
            </li>
            <li>
              <NavLink to="/create" activeClassName="active" activeStyle={{fontWeight: "bold", background: "green"}}>Create New JHA</NavLink>
            </li>
          </ul>
        </nav>

        <div style={{marginTop:"10px",'height':"100%",'width':"65%",'marginLeft':'auto', 'marginRight':'auto', 'display':'flex', 'flexDirection':'column', 'alignItems': 'center','justifyContent':"center"}}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Form />
            </Route>
            <Route path="/edit/:id">
              <Edit/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


