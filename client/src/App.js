import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Main from './components/main';

import { StoreContextProvider } from './contex';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart_total: 0,
      updateCart: () => {
        this.setState({cart_total: this.state.cart_total + 1})
      },
      deleteCart: () => {
        this.setState({cart_total: this.state.cart_total - 1})
      }
    }
  }

  componentWillMount(){
    let userdet = JSON.parse(localStorage.getItem("userdata"));            
        if(userdet){
          fetch("api/cart",
          {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({id: userdet._id})
          }).then(res => res.json()).then(data => {
             if(data){
               this.setState({cart_total: data.length})
             }
           });
               
        }  
  }
  render() {
    return (
      <StoreContextProvider  value={
          this.state
      }>
        <Header />
          <div className="container">
          
            <Main />
          </div>
      </StoreContextProvider>
     
    );
  }
}

export default App;
