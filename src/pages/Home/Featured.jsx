import React from 'react';
import SectionTitle from './components/SectionTitle';
import featurenImg from '../../assets/home/featured.jpg'
const Featured = () => {
    return (
        <div style={{backgroundImage: `url(${featurenImg})`}} className='my-20 pt-10 text-white bg-fixed'>
            <SectionTitle subtitle={'Chack It Out'} title={'form our menu'}></SectionTitle>
            <div className='md:flex gap-10 justify-center items-center p-2 md:px-20 md:pt-6  md:pb-20 bg-slate-500 opacity-70'>
                <div>
                    <img src={featurenImg} alt="image not found" />
                </div>
                <div className='space-y-2'>
                    <h3>March 20, 2023</h3>
                    <h3 className='uppercase'>where can i get some?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, saepe dolore, fugiat eius numquam laborum eaque, eos voluptas dignissimos animi pariatur sapiente in alias laboriosam! Eaque corporis maiores blanditiis fuga.</p>
                    <button className='btn btn-outline text-white border-b-4 border-0'>Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;