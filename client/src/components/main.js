import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './login'
import Home from './home'
import Details from './details'
import Signup from './signup'
import Cart from './cart'
import Profile from './profile'
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route  path='/login' component={Login}/>
      <Route  path='/signup' component={Signup}/>
      <Route  path='/details' component={Details}/>
      <Route  path='/cart' component={Cart}/>
      <Route  path='/Profile' component={Profile}/>
    </Switch>
  </main>
)

export default Main
