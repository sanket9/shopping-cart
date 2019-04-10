import React, { Component } from 'react'
import '../styles/cart.css';
import { Link } from "react-router-dom";
import StoreContex from '../contex'

export class cart extends Component {
  
    constructor(props) {
        super(props);
        
        this.state = { 
            cart: []     
        };
        this.getCart = this.getCart.bind(this);
    }
    removeCart(id){
        //console.log(id);
        if(window.confirm('Delete the item?')){
            fetch("api/cart/remove",
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({id})
                }).then(res => res.json()).then(data => {
                console.log(data);
                if(data.ok === 1) {
                    this.getCart();
                    this.context.deleteCart();
                }         
                })  
        }
    }
    updateCart(id){
        // console.log(id);
        
        let userdet = JSON.parse(localStorage.getItem("userdata"));        
       
            
        if(userdet){
            //console.log(this.state);
            let user_id = userdet._id;
            //             
            let data = {
              id,
              user_id
            };      
            console.log(data);
            fetch("api/cart/add",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data =>{
                console.log(data);
                
            },err=> {console.log(err);}
            )
            
        }
    }
    updatebyoneCart(obj_id, i, type){
        type === 'plus'? 
        this[`ageValue${i}`].value =  parseInt(this[`ageValue${i}`].value) + 1 :
        this[`ageValue${i}`].value =  parseInt(this[`ageValue${i}`].value) - 1;
        
        let data = {
            id: obj_id,
            type
        }
        console.log();
        
        if(parseInt(this[`ageValue${i}`].value) < 1){
            if(window.confirm('Delete the item?')){
                fetch("api/cart/updatecart",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(data =>{
                    this.getCart();
                })
            }else{
                this[`ageValue${i}`].value =  parseInt(this[`ageValue${i}`].value) + 1;
            }
            
        }else{
            fetch("api/cart/updatecart",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => res.json()).then(data =>{
                //console.log(data);
                if(data.no_of_product === parseInt(this[`ageValue${i}`].value)){
                    
                   this.getCart();                   
                }
            },err=> {
                console.log(err);
            });
        }        
    }

    componentDidMount()
    {        
        this.getCart();      
    }

    getCart(){
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
              console.log(data);
              if(data){
                this.setState({cart: data})
                let sum = 0;
                let totalcost;
                data.forEach(ele => {
                    sum = sum +(ele.no_of_product * ele.total_product_cost);
                    
                });
                totalcost = sum + 100;
                //console.log(sum, totalcost);
                this.setState({
                    totalcost,
                    sum
                })
              }              
            })  
        }
    }
  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th style={{width:"50%"}}>Product</th>
                                <th style={{width:"10%"}}>Price</th>
                                <th style={{width:"25%"}}>Quantity</th>
                                <th style={{width:"15%"}} className="text-center">Subtotal</th>
                                <th style={{width:"10%"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.map((obj, i)=> {
                                return(
                                    
                                    <tr key={i}>
                                        <td data-th="Product">
                                            <div className="row">
                                                <div className="col-sm-2 hidden-xs"><img src={obj.product_id.image_path} alt="..." className="img-fluid"/></div>
                                                <div className="col-sm-10">
                                                    <h4 className="nomargin">{obj.product_id.name}</h4>
                                                    <p>{(obj.product_id.desc).substr(0, 50)}..</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-th="Price">₹{obj.total_product_cost}</td>
                                        <td data-th="Quantity">
                                            <div className="qty">
                                                <span className="minus bg-dark" onClick={this.updatebyoneCart.bind(this, obj._id, i, 'minus')}>-</span>
                                                <input type="number" className="count" ref={el => this[`ageValue${i}`]=el} name="qty" value={obj.no_of_product} disabled/>
                                                <span className="plus bg-dark" onClick={this.updatebyoneCart.bind(this, obj._id, i, 'plus')}>+</span>
                                            </div>
                                        </td>
                                        <td data-th="Subtotal" className="text-center"><b>₹{obj.no_of_product * obj.total_product_cost} </b></td>
                                        <td className="actions" data-th="">
                                            
                                            <button onClick={this.removeCart.bind(this, obj._id)} className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>								
                                        </td>
                                    </tr>
                                    
                                );
                                
                            })}             

                        </tbody>
                        <tfoot>                    
                            <tr>
                                <td><Link to="/" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</Link></td>
                                <td colSpan="1" className="hidden-xs"></td>
                                <td className="hidden-xs text-right"><strong>Product Price</strong></td>
                                <td className="hidden-xs text-center"><strong>
                                    {this.state.cart.reduce((sum, i)=> (
                                    
                                        sum += i.no_of_product * i.total_product_cost
                                    
                                    ),0)}
                                </strong></td>
                                <td><a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a></td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
                <div className="col-md-3">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>Total Product Price</td>
                                <td>₹ {this.state.sum}
                                    
                                </td>
                            </tr>
                            <tr>
                                <td>Delevary Cost</td>
                                <td>₹100</td>
                            </tr> 
                            <tr className="border-top">
                                <td>Total Priece</td>
                                <td> <b> ₹
                                {this.state.totalcost}
                                </b>
                                </td>
                            </tr>             
                        </tbody>
                        
                    </table>
                    <Link className="btn btn-success float-right" to="checkout">Checkout <i className="fa fa-angle-right"></i></Link>
                </div>
            </div>
            
        </div> 
            
    )
  }
}
cart.contextType = StoreContex;

export default cart
