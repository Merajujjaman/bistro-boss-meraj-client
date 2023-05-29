import React, { useEffect, useState } from 'react';
import SectionTitle from './components/SectionTitle';
import ManuItems from '../../Shared/ManuItems';
import useMenu from '../../Hooks/useMenu';

const PopularManu = () => {

    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <section className='mb-20 p-2'>
            <SectionTitle
                subtitle={"Popular Items"}
                title={'From our manu'}
            ></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item => <ManuItems
                        key={item._id}
                        item={item}
                    > </ManuItems>)
                }
            </div>
        </section>
    );
};

export default PopularManu;