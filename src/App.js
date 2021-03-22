 import React, { Component } from 'react'
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products'
import data from "./data.json";


class App extends Component {
  constructor(){
    super();
    this.state= {
      // cartItems:[],
      cartItems: localStorage.getItem("cartItems") ? 
      JSON.parse(localStorage.getItem("cartItems")) : [],
      Products:data.products,
      size:"",
      sort:""
    }
  } 
  createOrder = (order) => {
    alert("need to save " + order.name)
  }

  removeFromCart =(product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems:cartItems.filter((x) => x._id !==product._id)})
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !==product._id)));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems})
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

  }
  
  sortProducts =(event) => { 
    const sort = event.target.value;
    console.log("sort", event.target.value);
    this.setState({
      sort:sort,
      Products:(data.products.slice().sort((a,b)=>(
        sort === "lowest" ?
        a.price > b.price ? 1 :-1
        :sort === "highest" ?
        a.price < b.price ? 1 : -1
        :a._id < b._id ? 1 : -1
      )
      ))
    })
  }
  
  filterProducts= (event) =>{
    console.log("filter",event.target.value);
    if (event.target.value === ""){
      this.setState({size: event.target.value, Products:data.products})
    } else {
      this.setState({
        size:event.target.value,
        Products:data.products.filter((product) => 
        product.availableSizes.indexOf(event.target.value) >= 0
        )
      })
    }
   
  }

  render() {
    console.log("====--",this.state.Products)
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
         <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.Products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts} />
            <Products products={this.state.Products}
            addToCart = {this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems}
              createOrder={this.createOrder}
              removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>
          All right reserved,
        </footer>        
      </div>
    );
  }
}

export default App;
