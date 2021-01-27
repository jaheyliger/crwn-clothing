import React from 'react'
import { Link } from 'react-router-dom'
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg' 
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import CartIcon from '../../components/cart-icon/cart-icon'
import CartDropdown from '../cart-dropdown-menu/cart-dropdown'

const Header = ({ currentUser, hidden }) => {
    return (
        <div className="header">
            <Link to='/'>
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link className='option' to='/shop'>Shop</Link>
                <Link className='option' to='/shop'>Contact</Link>
                {
                    currentUser ?
                    <div className="option" onClick={() => auth.signOut()} >Sign Out</div>
                    :
                    <Link className="option" to='/signin' >Sign In</Link>
                }
                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }          
        </div>
    )
}

const mapStateToProps = ({user: { currentUser }, cart: { hidden}}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header)