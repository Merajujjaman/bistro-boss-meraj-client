import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaCalendarAlt, FaWallet, FaHamburger, FaShoppingBag, FaMailBulk, FaUtensilSpoon, FaBook, FaUsers, FaUtensils } from 'react-icons/fa'
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';

const DashboardLyout = () => {
    const [cart] = useCart()
    // TODO: set the admin form database dynamicly 
    // const isAdmin = true;

    const [isAdmin] = useAdmin()

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* <!-- Page content here --> */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content uppercase">
                    {/* <!-- Sidebar content here --> */}
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/home'><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/reservation'><FaUtensils></FaUtensils> Add Items </NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'><FaHamburger></FaHamburger> Manage Items</NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'><FaBook></FaBook> Manage Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/allusers'> <FaUsers></FaUsers> All Users</NavLink></li>
                            
                        </>
                            :
                            <>
                                <li><NavLink to='/dashboard/home'><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservation'><FaCalendarAlt></FaCalendarAlt> Reservation</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory'><FaWallet></FaWallet> Paymeny History</NavLink></li>
                                <li><NavLink to='/dashboard/myCart'><FaShoppingCart></FaShoppingCart> My Cart
                                    <span className="badge badge-secondary">+{cart ? cart?.length : 0}</span>
                                </NavLink></li>
                            </>
                    }


                    <div className="divider border-2"></div>

                    <li><NavLink to='/'><FaHome></FaHome>  Home</NavLink></li>
                    <li><NavLink to='/menu'><FaHamburger></FaHamburger> Menu</NavLink></li>
                    <li><NavLink to='/order/dessert'><FaShoppingBag></FaShoppingBag> Shop</NavLink></li>
                    <li><NavLink to='/dashboard/contact' ><FaMailBulk></FaMailBulk> Contact</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default DashboardLyout;