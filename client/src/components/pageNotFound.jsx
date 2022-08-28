import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <>
            <div className='min-h-full pt-16 pb-12 flex flex-col bg-white'>
                <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex-shrink-0 flex justify-center'>
                        <a href='/' className='inline-flex'>
                            <span className='sr-only'>Workflow</span>
                            <img
                                className='h-12 w-auto'
                                src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                                alt=''
                            />
                        </a>
                    </div>
                    <div className='py-16'>
                        <div className='text-center'>
                            <p className='text-base font-semibold text-indigo-600'>
                                404
                            </p>
                            <h1 className='mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl'>
                                Page not found.
                            </h1>
                            <p className='mt-2 text-base text-gray-500'>
                                Sorry, we couldn’t find the page you’re looking
                                for.
                            </p>
                            <div className='mt-6'>
                                <Link
                                    to='/'
                                    className='text-base font-medium text-indigo-600 hover:text-indigo-500'
                                >
                                    Go back home
                                    <span aria-hidden='true'> &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
