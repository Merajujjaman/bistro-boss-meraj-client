import React from 'react';

const ManuItems = ({item}) => {
    const {image, name, recipe, price} = item;
    return (
        <div className='flex space-x-2'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-[120px]' src={image} alt="image not found" />
            <div>
                <h3 className='uppercase'>{name}----------</h3>
                <p >{recipe}</p>
            </div>
            <p className='text-[#BB8506]'>${price}</p>
        </div>
    );
};

export default ManuItems;