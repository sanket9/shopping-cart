import React, { Component } from 'react'
import { Link } from "react-router-dom";
import StoreContex from '../contex'

export class home extends Component {

  constructor(props) {
    super(props);
    
    this.state = {      
    };
}
  componentDidMount()
    {
      fetch('api/product').then(res => res.json()).then(data =>{
        this.setState({data: data})
        console.log(data);
        
      })
    }

    addCart(id){
      let userdet = JSON.parse(localStorage.getItem("userdata"));            
        if(userdet){
            //console.log(this.state);
            let user_id = userdet._id;
            //             
            let data = {
              id,
              user_id
            };            
            fetch("api/cart/add",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data => {
              // console.log(data);
              if(data.no_of_product === 1){
                this.context.updateCart();
              }              
            })  
            
        }
        // this.props.changeValue(user_id)
      
    }

  render() {
    return (
      <div>
        <div className="row">
        {this.state.data  ? 
           
        (this.state.data.map((obj,i) => {
          return(
            <div className="col-md-3 mt-3" key={i}>

              <div className="card">
                <img className="card-img-top" src={obj.image_path} alt={`this a product image with of ${obj.name} and this is only avalabe on our website-${i}.!!!!!`} style={{height: '250px'}} />
                <div className="card-body">
                  <h5 className="card-title">{obj.name}</h5>
                  <p className="card-text">Price: <span>{obj.price}</span></p>
                  <Link className="btn btn-primary" to="#" onClick={this.addCart.bind(this, obj._id)}>Add to Bag</Link>
                </div>
              </div>
            </div>
          );
        })) : (
        <p style={{textAlign: 'center'}}>Loading Please Wait..</p>)
      }
          
        </div>
      </div>
    )
  }
}
home.contextType = StoreContex;

export default home
