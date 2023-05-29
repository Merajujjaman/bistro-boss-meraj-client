import React from 'react';
import ManuItems from '../../Shared/ManuItems';
import Cover from '../Home/components/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, categoryImg, title }) => {
    return (
        <div className='my-20'>
            <div className='mb-10'>
                {title && <Cover img={categoryImg} coverTitle={title}></Cover>}
            </div>

            <div className='grid md:grid-cols-2 gap-10'>
                {
                    items.map(item => <ManuItems
                        key={item._id}
                        item={item}
                    > </ManuItems>)
                }
            </div>
            <Link to={`/order/${title}`} className='flex justify-center mt-10'>
                <button className='btn text-blck border-b-4 border-0'>Order now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;