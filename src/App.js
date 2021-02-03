import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './App.css';

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component.jsx';
import Checkout from './pages/checkout/checkout'
import ShopPage from './pages/shop/shop.component'
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-out.component.jsx'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector'


class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount() {

    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {//Auth state change is sign in or sign out
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        
        userRef.onSnapshot(snapShot => { 
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={Checkout} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? 
              (<Redirect to='/' />
              ) : (
                <SignInSignUp />
                )
            } 
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
