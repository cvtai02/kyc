import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';
import Logo from '@/components/logo';
import { IoIosNotifications } from 'react-icons/io';
import { RiFunctionFill } from 'react-icons/ri';
import { IoMoonSharp, IoSettings } from 'react-icons/io5';
import { useState } from 'react';

export default function Layout() {
  const {  logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const { user } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo text="Simple KYC" />

            </div>
            <div className="flex items-center gap-8">
              <IoIosNotifications size={20} />
              <RiFunctionFill size={20} />
              <IoMoonSharp size={20} />

              <div 
                className="relative inline-block"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <img
                  className="h-8 w-8 rounded-full cursor-pointer"
                  src={user?.image || '/default-avatar.png'}
                  alt="User Avatar"
                />

                {showDropdown && (
                  <div 
                    className="absolute right-0 top-full pt-2 w-48 z-10"
                  >
                    <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => window.location.href = '/profile'}
                      >
                        Profile
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => window.location.href = '/settings'}
                      >
                        Settings
                      </button>
                      <hr className="my-1" />
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-4rem)]">
          <nav className="mt-6">
            <Link 
              to="" 
              className={`flex items-center gap-3 px-6 py-3 text-secondary hover:bg-blue-50 hover:text-highlight transition-colors ${
                isActive('/dashboard') ? 'bg-blue-50 text-highlight border-r-4 border-highlight' : ''
              }`}
            >
              <IoSettings size={20} />
              <span className="font-medium">Example</span>
            </Link>
         
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 mx-auto py-6 px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

