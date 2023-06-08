import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import './CheckoutForm.css'
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({ cart, price }) => {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
                .catch(error => {
                    // console.log(error);
                    toast.error(error.message)
                })
        }
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            return toast.error(error.message)
        }

        // else {
        //     console.log('seccess message from stripe:', paymentMethod);
        // }
        setProcessing(true)

        const { paymentIntent, err } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'Unknown',
                        email: user?.email || 'anonymus'
                    },
                },
            },
        );
        if (err) {
            console.log(err);
            toast.error(err.message)
        }

        setProcessing(false)
        // console.log(paymentIntent);
        if (paymentIntent?.status === 'succeeded') {
            const transectionId = paymentIntent?.id;
            // console.log(transectionId);
            const paymentDetails = {
                name: user?.displayName,
                email: user?.email,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.itemId),
                items_name: cart.map(item => item.name),
                status: 'service panding'
            }

            axiosSecure.post('/payments', paymentDetails)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedResult.insertedId || res.data.deletedResult.deletedCount >0) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your payment is successfull',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    }
                })
        }

    }

    return (
        <>
            <form className='p-2 md:w-2/3 mx-auto' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-5' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <Toaster></Toaster>
        </>
    );
};

export default CheckoutForm;