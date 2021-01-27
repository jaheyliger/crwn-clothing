import React, { Component } from 'react'

import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends Component {
    
    constructor(props){
        super(props)
        this.state ={
            email: '',
            password: ''
        }
    }
    
    handleSubmit = async (e) => {
        e.preventDefault()
        const {email, password } = this.state
        try{
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: ''})
        }catch (error){
            console.log(error)
        }
    }

    handleChange = (e) => {
        const {value, name} = e.target
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your Email and Password</span>
            
                <form onSubmit={this.handleSubmit} >
                    <FormInput 
                        type="email" 
                        name='email' 
                        label='Email'
                        value={this.state.email} 
                        required 
                        handleChange={this.handleChange}
                    />

                    <FormInput 
                        type="password" 
                        name='password'
                        label='Password' 
                        value={this.state.password} 
                        required
                        handleChange={this.handleChange} 
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign In With Google</CustomButton>
                    </div>
                </form>
            
            </div>
        )
    }
}

export default SignIn