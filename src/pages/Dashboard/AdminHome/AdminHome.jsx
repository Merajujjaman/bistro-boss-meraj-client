import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
                return res.data
        }
    })

    return (
        <div className='w-full p-2'>
            <h1 className='text-xl font-bold my-5'>Hi, {user?.displayName}</h1>

            <div className="stats shadow w-full">

                <div className="stat place-items-center">
                    <div className="stat-title">Customers</div>
                    <div className="stat-value">{stats.customers}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Total Items</div>
                    <div className="stat-value text-secondary">{stats?.products}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats?.revenue}</div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;