import { Link } from 'react-router-dom';

export default function Budget() {
    return (
        <main style={{ padding: '1rem 0' }}>
            <div className='text-2xl'>Budgets</div>
            <Link className='text-lg' to='/'>
                Home
            </Link>
        </main>
    );
}
