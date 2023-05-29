import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';


const Login = () => {

    const [disabled, setDisabled] = useState(true)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.pathname || '/' ;

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'log in successfull',
                showConfirmButton: false,
                timer: 1500
              })
              navigate(from, {replace: true})

        })

    }

    const handleCaptcha = event => {
        const validCaptcha = event.target.value;
        console.log(validCaptcha);
        if (validateCaptcha(validCaptcha) == true) {
            setDisabled(false)
        }

        else {
            setDisabled(true)
        }
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center md:w-1/2 ">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2  shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleCaptcha} type="text" name="captcha" placeholder="write the captcha" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center my-4'>New here?<Link to='/register' state={location?.state} replace className='text-info'>create an account</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Login;