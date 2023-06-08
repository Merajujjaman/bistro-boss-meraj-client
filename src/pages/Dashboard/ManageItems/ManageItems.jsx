import React from 'react';
import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../Home/components/SectionTitle';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu,  ,refetch] = useMenu()
    const [axiosSecure] = useAxiosSecure()

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${item.name} item?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }
    return (
        <div className='w-full p-2'>
            <SectionTitle subtitle="Hurry Up" title="Manage All Items"></SectionTitle>
            <div>
                <h1 className='text-3xl font-semibold my-4'>Total Items:{menu.length} </h1>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead >
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) =>
                                    <tr key={item._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="item's photo not avilable" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.category}
                                        </td>
                                        <td className='text-right'>
                                            ${item.price}
                                        </td>
                                        <td>
                                            <button className="btn btn-ghost btn-xs">Updete</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(item)} className="btn bg-red-400 border-0 text-white"><FaTrashAlt></FaTrashAlt></button>
                                        </td>
                                    </tr>)
                            }

                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;