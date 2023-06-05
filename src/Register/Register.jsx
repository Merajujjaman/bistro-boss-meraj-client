import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../pages/Home/components/SocialLogin';

const Register = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { createUser, updateUser, logOut } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.pathname || '/';

    // const handleRegister = event => {
    //     event.preventDefault()
    //     const form = event.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const password = form.password.value;
    //     console.log(name, email, password);
    // }
    const handleRegister = data => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUser(data.name, data.photoUrl)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, photo: data.photoUrl }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'user created successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    reset()
                                    navigate(from, { replace: true })
                                }
                            })


                    }).catch((error) => {
                        console.log(error);
                    });


            })
    };


    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center md:w-1/2 ">

                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2  shadow-2xl bg-base-100">
                        <h1 className="text-5xl font-bold text-center mt-2">Create Account</h1>
                        <form onSubmit={handleSubmit(handleRegister)} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name")} placeholder="name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="url"  {...register("photoUrl")} placeholder="Photo Url" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password")} placeholder="password" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Create" />
                            </div>
                        </form>
                        <p className='text-center my-4'>Already have an account?<Link to='/login' className='text-info'>Login</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;