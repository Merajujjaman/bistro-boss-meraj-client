import React from 'react';
import useCart from '../../../Hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import SectionTitle from '../../Home/components/SectionTitle';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cart, refetch] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0)

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.deletedCount > 0){
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
        <>
            <SectionTitle subtitle='My Cart' title='wanna add more?' ></SectionTitle>

            <div className='uppercase flex justify-around  gap-2 p-2 font-semibold md:text-xl h-[70px] md:w-4/5'>
                <h1>Total Order: {cart.length}</h1>
                <h1>Total price: ${total}</h1>
                <button className='btn btn-warning btn-sm'>pay</button>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table mx-auto md:w-4/5">
                    {/* head */}
                    <thead >
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, index) => <tr>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Food image" />
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {item.name}
                                </td>

                                <td className=' justify-end'>
                                    ${item.price}
                                </td>

                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn bg-red-400 border-0 text-white"><FaTrash></FaTrash></button>
                                </td>
                            </tr>)
                        }

                    </tbody>



                </table>
            </div>
        </>

    );
};

export default MyCart;