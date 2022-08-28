import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import supabase from '../common/supabase';

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);

    const location = useLocation();

    useEffect(() => {
        updateAuthButtons();
        updateCurrentTabs();
    }, [loggedIn, location]);

    supabase.auth.onAuthStateChange(async (event, session) => {
        updateAuthButtons();
    });

    function updateAuthButtons() {
        const user = supabase.auth.user();
        if (user !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }

    function updateCurrentTabs() {
        console.log(location.pathname);
    }

    const navigate = useNavigate();

    async function logout() {
        const { error } = await supabase.auth.signOut();
        if (error) navigate('/error');
        navigate('/login');
    }

    const logoutButtons = (
        <>
            <Link className='m-1' to='/login'>
                <button
                    type='button'
                    className='inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={logout}
                >
                    Logout
                </button>
            </Link>
        </>
    );

    const loginRegisterButtons = (
        <>
            <Link className='m-1' to='/login'>
                <button
                    type='button'
                    className='inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                    Login
                </button>
            </Link>
            <Link className='m-1' to='/register'>
                <button
                    type='button'
                    className='inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                    Register
                </button>
            </Link>
        </>
    );

    const authButtons = loggedIn ? logoutButtons : loginRegisterButtons;

    return (
        <Disclosure as='nav' className='bg-white shadow'>
            {({ open }) => (
                <>
                    <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                        <div className='relative flex justify-between h-16'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button */}
                                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                                    <span className='sr-only'>
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                                <div className='flex-shrink-0 flex items-center'>
                                    <img
                                        className='block lg:hidden h-8 w-auto'
                                        src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                                        alt='Workflow'
                                    />
                                    <img
                                        className='hidden lg:block h-8 w-auto'
                                        src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                                        alt='Workflow'
                                    />
                                </div>
                                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                                    <Link
                                        to='/dashboard'
                                        className={`${
                                            location.pathname === '/dashboard'
                                                ? 'border-indigo-500'
                                                : 'border-transparent'
                                        } ${
                                            location.pathname === '/dashboard'
                                                ? 'text-gray-900'
                                                : 'text-gray-500'
                                        } hover:border-gray-300 hover:text-gray-700 active:border-indigo-500 active:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to='/budget'
                                        className={`${
                                            location.pathname === '/budget'
                                                ? 'border-indigo-500'
                                                : 'border-transparent'
                                        } ${
                                            location.pathname === '/budget'
                                                ? 'text-gray-900'
                                                : 'text-gray-500'
                                        } hover:border-gray-300 hover:text-gray-700 active:border-indigo-500 active:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        Budget
                                    </Link>
                                </div>
                            </div>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                {authButtons}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='pt-2 pb-4 space-y-1'>
                            <Link to='/dashboard'>
                                <Disclosure.Button
                                    as='a'
                                    className={`${
                                        location.pathname === '/dashboard'
                                            ? 'border-indigo-500'
                                            : 'border-transparent'
                                    } ${
                                        location.pathname === '/dashboard'
                                            ? 'text-gray-900'
                                            : 'text-gray-500'
                                    } hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 active:border-indigo-500 active:text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                                >
                                    Dashboard
                                </Disclosure.Button>
                            </Link>
                            <Link to='/budget'>
                                <Disclosure.Button
                                    as='a'
                                    className={`${
                                        location.pathname === '/budget'
                                            ? 'border-indigo-500'
                                            : 'border-transparent'
                                    } ${
                                        location.pathname === '/budget'
                                            ? 'text-gray-900'
                                            : 'text-gray-500'
                                    } hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 active:border-indigo-500 active:text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                                >
                                    Budget
                                </Disclosure.Button>
                            </Link>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
