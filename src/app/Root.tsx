import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

export default function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#fdf8f0', fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <Outlet />
      </div>
    </AuthProvider>
  );
}
