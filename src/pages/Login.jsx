import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import banner from '../images/im-1.png';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../contexts/UserContext';
import Swal from 'sweetalert2';

const Login = () => {
    const {signIn, signWithGoogle} = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    //private route location setup
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        //Sign In with firebase 
        signIn(email, password)
        .then((result) => {
            const user = result.user;
            //self practice email varify
            if(!user.emailVerified){
                return Swal.fire(
                    '🚀Plzz Cheack your email varify!',
                )
            }
            form.reset();
            navigate(from, {replace: true});
            console.log(user)
            
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            console.log('Sign In error: ', errorMessage);
        })
        setError('');
    }
    //sign with google
    const handleGoogleSignIn = () => {
        signWithGoogle()
        .then(result => {
            const user = result.user;
            navigate(from, {replace: true});
            console.log(user);
        })
        .catch(error => {
            const errorMessage = error.message;
            setError(errorMessage);
            console.log('Google Sign in: ', errorMessage);
        })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-gray-800">
                <div className="grid grid-cols-2 lg:flex-row-reverse gap-4">
                    <div className="text-center lg:text-left bg-gray-800 shadow-2xl">
                        <img src={banner} alt="" />
                    </div>
                    <div className="shadow-2xl bg-gray-800 p-4 rounded-lg">
                        <h1 className="text-4xl font-bold px-8">Login now!</h1>
                        <form onSubmit={handleSubmit} className="card-body pb-0">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <p className='text-rose-700 font-semibold'>{error}</p>
                            </div>
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <div className='flex items-center gap-3'>
                                    <input type="checkbox" className="checkbox checkbox-primary w-5 h-5" />
                                    <span className="label-text">Remember me</span>
                                    </div>
                                    <Link href="#" className="label-text-alt link link-hover text-base font-semibold underline text-blue-600">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                            <label className="label">
                                    Don’t have a account?
                                    <Link to="/signup" className="label-text-alt link link-hover text-base underline text-blue-500 font-semibold">Sign Up</Link>
                            </label>
                        </form>
                        <div className="flex flex-col w-full border-opacity-100 px-8">
                            <div className="divider before:bg-pink-700 after:bg-pink-700">OR</div>
                        </div>
                        <div className='px-8 pb-2 mt-2'>
                            <button onClick={handleGoogleSignIn} className='flex items-center justify-center w-full border-4 border-[#ebebeb1a] hover:border-[#ebebeb36] py-2'>
                            <span className='text-xl'><FcGoogle /></span>
                            <p className='ml-2'>Continue with Google</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;