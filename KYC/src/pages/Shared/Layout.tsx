import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';
import Logo from '@/components/logo';
import Button from '@/components/button';

export default function Layout() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo withText={true} />
            </div>
            <div className="flex items-center gap-4">
              <span >
                {user?.name || 'User'}
              </span>
              <Button variant="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
