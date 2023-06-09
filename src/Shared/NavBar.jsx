import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { GiShoppingCart } from 'react-icons/gi';
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';

const NavBar = () => {
    const { logOut, user } = useContext(AuthContext)
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(error => console.log(error))
    }
    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menu</Link></li>
        <li><Link to='/order/dessert'>Order</Link></li>
        <li><Link to={isAdmin? 'dashboard/adminHome' : 'dashboard/userHome'}>Dashboard</Link></li>
        {
            user ? <><button onClick={handleLogOut} className='btn btn-ghost'>Log out</button></>
                :
                <> <li><Link to='/login'>Login</Link></li></>
        }

    </>
    return (
        <div className="navbar fixed z-30  bg-black bg-opacity-30 text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/dashboard/myCart'>
                    <button className="btn gap-2 mr-2">
                        <GiShoppingCart></GiShoppingCart>
                        <div className="badge badge-secondary">+{cart ? cart?.length : 0}</div>
                    </button>
                </Link>
                {
                    user &&
                    <>
                        <img src={user?.photoURL} title={user?.displayName} alt="user photo" className='w-12 rounded-full mr-2' />
                    </>
                }
            </div>
        </div>
    );
};

export default NavBar;