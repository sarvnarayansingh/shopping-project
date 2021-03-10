import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

 class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productmodal:null,
        }
    }

    openModal = (product) => {
        this.setState({productmodal:product})
    }
    closeModal = () => {
        this.setState({productmodal:null})
    }

    render() {
        return (
            <div>
                <Fade bottom cascade>
                    <ul className="products">
                        {/* //products comes from app.js through props */}
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} 
                                        onClick={() =>this.openModal(product)}>
                                        <img src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                    </a>
                                </div>
                                <div className="product-price">
                                    {/* <div>{formatCurrency(product.price)}</div> */}
                                    <button className="button primary" onClick={() =>this.props.addToCart(product)}> Add To Cart</button>
                                </div>
                            </li>
                        ))}
                        
                    </ul>
                </Fade>
                { this.state.productmodal && (
                <Modal isOpen= {true}
                onRequestClose = {this.closeModal}>
                    <Zoom>
                        <button className='close-modal' onClick = {this.closeModal}>X</button>
                        <div className='product-details'>
                            <img src={this.state.productmodal.image} alt={this.state.productmodal.title}></img>
                            <div className='product-details-description'>
                                <p>
                                     <strong>{this.state.productmodal.title}</strong>
                                </p>
                                <p>{this.state.productmodal.description}</p>
                                 <p>
                                    AvailableSizes:{" "}
                                    {this.state.productmodal.availableSizes.map((x,index) => (
                                        <span key={index}>
                                            {" "}
                                            <button className='button'>{x}</button>
                                        </span>
                                    ))}
                                </p>
                                <div className='product-price'>
                                    <div>{formatCurrency(this.state.productmodal.price)}</div>
                                    <button className='button primary' onClick={()=>{
                                        this.props.addToCart(this.state.productmodal);
                                        this.closeModal()}}>
                                        AddtoCart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
                )}
            </div>
        )
    }
}

export default Products