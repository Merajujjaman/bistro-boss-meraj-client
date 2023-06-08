import React from 'react';
import { useForm } from "react-hook-form";
import SectionTitle from '../../Home/components/SectionTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset, } = useForm();
    const image_host_url = `https://api.imgbb.com/1/upload?key=${image_key}`

    const onSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(image_host_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageRes => {
                if (imageRes.success) {
                    const image_url = imageRes.data.display_url;
                    const { name, category, price, recipe } = data;
                    const newItem = { name, category, price: parseFloat(price), recipe, imgae: image_url }
                    console.log(newItem);

                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            if (data.data.insertedId) {
                                reset()
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Item upload successfull',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })

                }
            })
    };
    // console.log(image_key);
    return (
        <div className='w-full p-2 md:w-4/5 mx-auto'>
            <SectionTitle subtitle="what's New ?" title="add an item"></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className='p-5 bg-[#F3F3F3] rounded'>
                {/* name */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name" className="input input-bordered w-full"
                        {...register("name", { required: true })}
                        required />
                </div>
                <div className='md:flex gap-10'>
                    {/* category */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue='Pick One' className="select select-bordered"
                            {...register("category", { required: true })}
                        >
                            <option disabled >Pick One</option>
                            <option value='dessert'>Dessert</option>
                            <option value='Pizza'>Pizza</option>
                            <option value='soup'>Soup</option>
                            <option value='salad'>Salad</option>
                            <option value='drinks'>Drinks</option>
                            <option value='popular'>Popular</option>
                            <option value='offred'>Offred</option>
                        </select>

                    </div>
                    {/* {price} */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input type="number" placeholder="Type here" className="input input-bordered w-full"
                            {...register("price", { required: true })}
                            required />
                    </div>
                </div>

                {/* text area */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Item Details*</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-28" placeholder="Item details"
                        {...register("recipe", { required: true })}
                        required></textarea>

                </div>
                {/* item image input */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Upload Item's Image*</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                        {...register("image", { required: true })}
                        required />
                </div>
                {/* submit */}
                <input type="submit" value="Add Item" className='btn btn-block my-5' />
            </form>
        </div>
    );
};

export default AddItem;