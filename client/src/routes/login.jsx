import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import supabase from '../common/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const user = supabase.auth.user();
        if (user !== null) navigate('/');
    }, [navigate]);

    function turnOnError(message) {
        setShowError(true);
        setErrorMessage(message);
    }

    function turnOffError() {
        setShowError(false);
    }

    async function signIn() {
        const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
        });
        if (error) {
            turnOnError(error.message);
        }
        navigate('/');
    }

    const errorBox = (
        <div className='rounded-md bg-red-50 p-4'>
            <div className='flex'>
                <div className='flex-shrink-0'>
                    <XCircleIcon
                        className='h-5 w-5 text-red-400'
                        aria-hidden='true'
                    />
                </div>
                <div className='ml-3'>
                    <p className='text-sm font-medium text-red-800'>
                        {errorMessage}
                    </p>
                </div>
                <div className='ml-auto pl-3'>
                    <div className='-mx-1.5 -my-1.5'>
                        <button
                            type='button'
                            onClick={turnOffError}
                            className='inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50'
                        >
                            <span className='sr-only'>Dismiss</span>
                            <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='mx-auto h-12 w-auto'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                >
                    <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                    <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                        clipRule='evenodd'
                    />
                </svg>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                    Sign in to your account
                </h2>
                <p className='mt-2 text-center text-sm text-gray-600'>
                    Or{' '}
                    <Link
                        to='/register'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                        Create your Account
                    </Link>
                </p>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Email
                        </label>
                        <div className='mt-1'>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Password
                        </label>
                        <div className='mt-1'>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                            />
                        </div>
                    </div>

                    {showError && errorBox}

                    <div className='flex items-center justify-between'>
                        <div className='text-sm'>
                            <Link
                                to='/'
                                className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type='button'
                            onClick={signIn}
                            className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
