import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({ price }) => {
    
    const priceForStripe = price * 100
    const publicKey = 'pk_test_51ILTjHJwyC08MgxFuozLSP3mg2IPAQGVCQmEHcQ1YUTGfdSEdUZwCdSyNehrIjmDcpain63xsv6Ls3fs3819IyTS009eaSjAjF'
    
    const onToken = token => {
        console.log(token)
        alert("Payment Successful")
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publicKey}
        />
    )
}

export default StripeButton
