import React from 'react';
import SectionTitle from '../../Home/components/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../Hooks/useCart';

// TODO: set strope publishable key
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`)
const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const price = parseFloat(total.toFixed(2))
    return (
        <div>
            <SectionTitle subtitle={'Pleare Process'} title={'payment'}></SectionTitle>
            
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;