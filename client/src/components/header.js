import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { StoreContextConsumer } from '../contex';
import StoreContex from '../contex'
export class header extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: ''
        };           
    }
    logout(e){
        e.preventDefault();
        localStorage.clear()
        this.setState({redirect: true})
    }
    componentDidMount(){
        let userdet = JSON.parse(localStorage.getItem("userdata"));            
        if(userdet){
            this.setState({email: userdet.email});                           
        }           
    }

  render() {
    if(this.state.redirect){
        return window.location.href= '/';
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Shopping</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        
                    </ul>
                    <div className="my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                            <StoreContextConsumer>
                            {(contex)=> (
                                <li className="nav-item active">                                
                                    <Link className="nav-link" to="/cart">
                                        <i className="fa fa-shopping-cart"></i>
                                        <span className="badge badge-warning">{contex.cart_total}</span>
                                        Cart 
                                    </Link>
                                </li>
                            )}
                            </StoreContextConsumer>
                            
                            {this.state.email ? (
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" data-toggle="dropdown" 
                                    to="#" role="button" aria-haspopup="true" aria-expanded="false">{this.state.email}</Link>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/profile">Profile</Link>
                                        <Link className="dropdown-item" to="#" onClick={this.logout.bind(this)}>Logout</Link>
                                    </div>
                                </li>
                            ): (
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/login">
                                        <i className="fa fa-user"></i> Login</Link>
                                </li>
                            )
                        }
                        </ul>
                    </div>
                </div>
            </div>
           
        </nav>
      </div>
    )
  }
}
header.contextType = StoreContex;
export default header
