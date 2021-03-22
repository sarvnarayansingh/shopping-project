import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            Address:"",
            showCheckOut: false };
    }
    handlerChange = (event) => {
        this.setState({[event.target.name]:event.target.value})

    }
    createOrder = (event) => {
        event.preventDefault();
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems
        }
        this.props.createOrder(order)
    }
    render() {
        
        const {cartItems} = this.props
        return (  
            <div>
                {cartItems.length === 0 ? ( <div className="cart cart-header">Cart is empty</div>)
                : (
                <div className="cart cart-header">you have {cartItems.length} in the cart {" "}</div>)}                
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt ={item.title}></img>
                                        </div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button className="button" onClick ={() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total={" "}
                                    {formatCurrency(cartItems.reduce((a,c) => a + c.price * c.count, 0))}
                                </div>
                                <button onClick = {() => this.setState({showCheckOut: true })} className="button primary">Proceed</button>
                            </div>
                            {this.state.showCheckOut && (
                                 <Fade right cascade>
                                    <div className ="cart">
                                        <form onSubmit = {this.createOrder}>                                  
                                                <ul className="form-container">
                                                    <li>
                                                        <label>Email</label>
                                                        <input type = "email"name="email" required onChange ={this.handlerChange}></input>
                                                    </li>
                                                    <li>
                                                        <label>Name</label>
                                                        <input type = "text" name="name" required onChange ={this.handlerChange}></input>
                                                    </li>
                                                    <li>
                                                        <label>Address</label>
                                                        <input type = "text" required name="address" onChange ={this.handlerChange}></input>
                                                    </li>
                                                    <li>
                                                        <button className="button primary" type="submit">Checkout</button>
                                                    </li>
                                                </ul> 
                                                
                                        </form>
                                    </div>
                            </Fade>
                            )}
                        </div>
                        
                    )}
                    
            </div>
           
            
           
        )
    }
    
}
