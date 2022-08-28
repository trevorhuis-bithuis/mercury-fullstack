import { Link } from 'react-router-dom';
import supabase from '../common/supabase';

export default function Dashboard() {
    return (
        <main style={{ padding: '1rem 0' }}>
            <div className='text-2xl'>Dashboard</div>
            <Link className='text-lg' to='/'>
                Home
            </Link>
        </main>
    );
}
