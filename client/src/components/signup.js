import React, { Component } from 'react'

export class signup extends Component {

    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.signup = this.signup.bind(this);
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

    signup(e){
        this.setState({messg: ''})
        e.preventDefault();
        fetch("api/user/useradd",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(data => {
            // console.log(data);
            //userdata = data.user
            if(data.user){
                let userdata = JSON.stringify(data.user);
                localStorage.setItem("userdata", userdata);
                this.setState({status: data.status, messg: data.message})
                setTimeout(function(){
                    this.setState({redirect: true})
                }.bind(this), 3000);


            }else{
                this.setState({status: data.status, messg: data.message});           
            }
        })
        
    }
  render() {
    if (this.state.redirect) {
        // return <Redirect push to="/" />;
        return window.location.href = "/"
    }
    return (
        <div className="card" style={{width: '30rem', margin: '10px auto'}}>
            <div className="card-body">
                <form onSubmit={this.signup}>
                    <h2 className="form-signin-heading"> Please Sign-Up </h2>
                    {(this.state.messg)? 
                        (
                            (this.state.state === 0) ? 
                            (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>{this.state.messg}</strong>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            ):
                            (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Loggin Successfuly..</strong>
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
                        <label className="sr-only"> Email Address
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"> 
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Email"
                            value={this.state.email} onChange={this.handleEmailChange}
                            aria-label="Email" aria-describedby="basic-addon1" required/>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="sr-only"> Password
                        </label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"> 
                                    <i className="fa fa-unlock-alt" aria-hidden="true"></i>

                                </span>
                            </div>
                            <input type="password" className="form-control" placeholder="*******"
                            value={this.state.password} onChange={this.handlePasswordChange}
                            aria-label="Password" aria-describedby="basic-addon1" required/>
                        </div>
                    </div>                 
                
                    <button className="btn btn-lg btn-primary btn-block" type="submit"> Sign in
                    </button>
                </form>
                
            </div>
        </div>
    )
  }
}

export default signup
