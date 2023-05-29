import React from 'react';

const FoodCard = ({item}) => {
    const {image, name, recipe, price} = item;
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={image} alt="food image" /></figure>
            <p className='bg-black text-white font-semibold rounded absolute right-10 mt-4 px-4 py-2'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title text-center">{name}</h2>
                <p className='text-start'>{recipe}</p>
                <div className="card-actions">
                    <button className="btn bg-slate-100 text-[#BB8506] border-0 border-b-4 border-[#BB8506]">add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;