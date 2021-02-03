import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item'
import {connect} from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

const CartDropdown = ({ cartItems, history, dispatch }) => {
    return (
        <div className='cart-dropdown'>
            <div className="cart-items">
                {
                    cartItems.length ?
                    cartItems.map(cartItem => (
                         <CartItem key={cartItem.id} item={cartItem} />
                    ))
                    :
                    <span className="empty-message">Your Cart Is Empty</span>
                }
            </div>
            <CustomButton onClick={() => {
                    history.push('/checkout');
                    dispatch(toggleCartHidden())
                }} >Go To Checkout</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

// const mapStateToProps = ({cart: {cartItems}}) => ({
//     cartItems
// })

export default withRouter(connect(mapStateToProps)(CartDropdown))
