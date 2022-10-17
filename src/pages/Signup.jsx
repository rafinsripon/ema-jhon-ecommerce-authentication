import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../images/im-1.png';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../contexts/UserContext';
import Swal from 'sweetalert2';

const Signup = () => {
    const [error, setError] = useState(null);
    const {createUser, verifyEmail} = useContext(AuthContext);

    const handleSubmit =(event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        // console.log(email, passwrod, confirm);
        //Pass and confirm password validation
        if(password.length < 6){
            setError('Password should be at least 6 characters or long');
            return;
        }
        if(password !== confirm) {
            setError('Invalid password, Does not match');
            return;
        }
        setError('');

        //Signup with email and password with firebase
        createUser(email, password)
        .then((result) => {
            const user = result.user;
            Swal.fire(
                '🚀Please Check Your Email Address!',
            )
            form.reset();
            console.log(user);
            //varify email adress
            verifyEmail()
            .then(() => {
                console.log('success')
            })
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            console.log('SignUp Error: ', error);
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
                        <h1 className="text-4xl font-bold px-8">Sign Up now.</h1>
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
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name='confirm' placeholder="confirm password" className="input input-bordered" required />
                            </div>
                            <p className='text-rose-600 font-semibold'>{error}</p>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Sign Up</button>
                            </div>
                            <label className="label">
                                    Already have a account?
                                    <Link to="/login" className="label-text-alt link link-hover text-base underline text-blue-500 font-semibold">Log In</Link>
                            </label>
                        </form>
                        <div className="flex flex-col w-full border-opacity-100 px-8">
                            <div className="divider before:bg-pink-700 after:bg-pink-700">OR</div>
                        </div>
                        <div className='px-8 pb-2 mt-2'>
                            <button className='flex items-center justify-center w-full border-4 border-[#ebebeb1a] hover:border-[#ebebeb36] py-2'>
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

export default Signup;