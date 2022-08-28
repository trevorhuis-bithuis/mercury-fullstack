import { Outlet, Link } from 'react-router-dom';
import Navbar from './components/navbar';

export default function App() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}
