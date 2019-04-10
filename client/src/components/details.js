import React, { Component } from 'react';

class Details extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
          data:[]
        };
    }
    componentDidMount()
    {
      fetch('http://localhost:5555/details').then(res => res.json()).then(data =>{
        this.setState({data: data})
        
      })
    }
    
    render() {

        return (
            <div>
            <table className="table">
             <thead>
               <tr>
                    <th style={{height: '50px'}}>Email</th>
                   <th style={{height: '50px'}}>F Name</th>
                   <th style={{height: '50px'}}>L Name</th>
                   <th style={{height: '50px'}}>Address</th>
                   <th style={{height: '50px'}}>City</th>
                   <th style={{height: '50px'}}>State</th>
                   <th style={{height: '50px'}}>Country</th>
                   <th style={{height: '50px'}}>Zip</th>
                   <th style={{height: '50px'}}>Phone</th>
                   <th style={{height: '50px'}}>Gender</th>
                   
               </tr>
             </thead>
             <tbody>
               {this.state.data.map((obj,i) => {
                 return (
                   <tr>
                     <td>{i+1}</td>
                     <td style={{backgroundColor: 'white'}}>
                       {obj.email}
                     </td>
                     <td style={{backgroundColor: 'white'}}>{obj.f_name}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.l_name}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.address}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.city}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.state}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.country}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.zip}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.phone}</td>
                     <td style={{backgroundColor: 'white'}}>{obj.zip}</td>
                   </tr>
                 );
               })}
             </tbody>
           </table>
         </div>
        )

    }
}

export default Details;
