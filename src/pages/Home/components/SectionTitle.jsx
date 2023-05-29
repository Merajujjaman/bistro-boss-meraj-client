import React from 'react';

const SectionTitle = ({subtitle, title}) => {
    return (
        <div className='md:w-4/12 mx-auto my-8 text-center'>
           <p className='text-[#D99904] mb-2 '>--- {subtitle} ---</p>
           <h1 className='text-3xl font-semibold py-4 border-y-4 uppercase'>{title}</h1> 
        </div>
    );
};

export default SectionTitle;