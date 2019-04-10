import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component{
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.state = {
          email:'',
          password:''
        };
    }
    handleEmailChange(e){
        this.setState({email:e.target.value});        
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value});
        
    }
    signIn(e){
        e.preventDefault();
        fetch("api/user/login",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(data => {
            // console.log(data);
            if(data.status === 0){
                let userdata = JSON.stringify(data.user);
                localStorage.setItem("userdata", userdata);
                this.setState({
                    status: data.status,
                    mssg : data.message
                });                
                setTimeout(function(){
                    this.setState({redirect: true})
                }.bind(this), 2000);
            }else{
                this.setState({
                    status: data.status,
                    mssg : data.message
                })
                // console.log(this.state);
            }
            
        })
        // this.setState({redirect: true});
        
    }
    render() {
        if (this.state.redirect) {
            return window.location.href = "/"
        }
        // if (this.state.show) {
        //     <p>Username or password Not match</p>
        //   } 
        return (
            <div className="card" style={{width: '30rem', margin: '10px auto'}}>
                <div className="card-body">
                    <form onSubmit={this.signIn}>
                        <h2 className="form-signin-heading"> Please sign in </h2>
                        {(this.state.mssg)? 
                            (
                                (this.state.status === 0) ? 
                                (
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        <strong>Login Successful..</strong>
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                ):
                                (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>{this.state.mssg}</strong>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                )
                                
                            ) : 
                            (
                                <div></div>
                            )
                           
                        }
                        <div className="form-group">
                            <label className="sr-only"> Email address
                            </label>
                            <input type="email" 
                            value={this.state.email} onChange={this.handleEmailChange} 
                            className="form-control" placeholder="Email address" required />
                        </div>
                        <div className="form-group">
                            <label className="sr-only"> Password</label>
                            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} 
                            className="form-control" placeholder="Password"  required />
                        </div>                   
                    
                        <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign in
                        </button>
                    </form>
                    <div className="text-center pt-2">
                        <p>New to Here
                            <span>
                                <Link to="/signup"> Sign Up Now</Link>

                            </span>
                        </p>
                    </div>
                </div>
            </div>
        );
      }
}

export default Login;
