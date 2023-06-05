import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data
    })

    const handleDelete = (user) => {
        Swal.fire({
            title: `Do you wont delete ${user.name} from database?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/delete/${user._id}`,{
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    refetch()
                    if(data.deletedCount > 0){
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

    const handleUpdate = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`,{
            method: 'PATCH'
        })
        .then(res => res.json())
        .then( data => {
            console.log(data);
            if(data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${user.name} is an admin now`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return (
        <div className='w-full'>
            <h1 className='text-3xl font-semibold my-5 mx-2'>Total Users: {users.length}</h1>

            <div className="overflow-x-auto mx-2">
                <table className="table w-full">
                    {/* head */}
                    <thead className='bg-[#D1A054]' >
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} alt="user's image" />
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        {user.name}
                                    </td>

                                    <td >
                                        {user.role === 'admin' ?
                                        'admin' 
                                        : 
                                        <button onClick={()=> handleUpdate(user)} className="btn bg-[#D1A054] border-0 text-white" title='make admin'><FaUserShield></FaUserShield></button>
                                        }
                                    </td>

                                    <td>
                                        <button onClick={() => handleDelete(user)} className="btn bg-red-400 border-0 text-white"><FaTrashAlt></FaTrashAlt></button>
                                    </td>
                                </tr>)
                        }

                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default AllUsers;