import React from 'react';
import chefBanner from '../../assets/home/chef-service.jpg'

const ChefBanner = () => {
    return (
        <div className="hero min-h-screen my-8 bg-fixed" style={{ backgroundImage: `url(${chefBanner})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className=" bg-white text-black md:w-3/4 py-20">
            <h1 className="mb-5 text-5xl font-bold">Bistro Boss</h1>
            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
          </div>
        </div>
      </div>
    );
};

export default ChefBanner;