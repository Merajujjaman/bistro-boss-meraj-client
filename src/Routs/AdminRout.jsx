import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import { Navigate } from 'react-router-dom';

const AdminRout = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()
    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center min-h-screen ">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }
    if (user && isAdmin) {
        return children
    }

    return <Navigate state={location} replace to='/'></Navigate>
};

export default AdminRout;