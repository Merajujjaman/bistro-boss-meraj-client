import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../Shared/Footer';
import NavBar from '../../Shared/NavBar';


const MainLayout = () => {
    const location = useLocation()
    const loginRout = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            {loginRout || <NavBar></NavBar>}

            <Outlet></Outlet>

            {loginRout || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;