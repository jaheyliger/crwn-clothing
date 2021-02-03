import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item'
import {connect} from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selectors'

const CartDropdown = ({ cartItems }) => {
    return (
        <div className='cart-dropdown'>
            <div className="cart-items">
                {
                    cartItems.map(cartItem => (
                         <CartItem key={cartItem.id} item={cartItem} />
                    ))
                }
            </div>
            <CustomButton>Go To Checkout</CustomButton>
        </div>
    )
}

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

// const mapStateToProps = ({cart: {cartItems}}) => ({
//     cartItems
// })

export default connect(mapStateToProps)(CartDropdown)
