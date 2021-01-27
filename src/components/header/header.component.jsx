import React from 'react'
import { Link } from 'react-router-dom'
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg' 
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import CartIcon from '../../components/cart-icon/cart-icon'

const Header = ({ currentUser }) => {
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header)