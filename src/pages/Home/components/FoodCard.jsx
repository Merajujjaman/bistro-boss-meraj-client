import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../Hooks/useCart';

const FoodCard = ({ item }) => {
    const { image, name, recipe, price, _id } = item;
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [,refetch] = useCart()

    //handle add to cart:
    const handleAddToCart = () => {
        // console.log(item);
        if (user && user.email) {
            const cartItem = { itemId: _id, image, name, price, email: user.email }
            fetch('http://localhost:5000/carts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch() 
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Successfully added to the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
                .catch(error => {
                    console.log(error.message);
                })
        }
        else {
            Swal.fire({
                title: 'Login Before add to the cart',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: location })
                }
            })
        }
    }
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={image} alt="food image" /></figure>
            <p className='bg-black text-white font-semibold rounded absolute right-10 mt-4 px-4 py-2'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title text-center">{name}</h2>
                <p className='text-start'>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} className="btn bg-slate-100 text-[#BB8506] border-0 border-b-4 border-[#BB8506]">add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;