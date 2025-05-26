import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, UserPlus, Search, Users } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open, onClose]);

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/register', label: 'Register Patient', icon: <UserPlus size={20} /> },
    { to: '/query', label: 'Query Patients', icon: <Search size={20} /> },
    { to: '/patients', label: 'Patient List', icon: <Users size={20} /> },
  ];

  const activeClass = 'bg-primary-100 text-primary-700 font-semibold';
  const inactiveClass =
    'text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors duration-150';

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <span className="text-2xl font-extrabold text-primary-800 tracking-tight">
            Medblocks
          </span>
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium
                 focus:outline-none focus-visible:ring-0
                 ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span className="flex-shrink-0" style={{ color: 'inherit' }} aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

      </aside>

      <aside className="hidden md:flex md:flex-shrink-0" aria-label="Sidebar">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-md">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <span className="text-2xl font-extrabold text-primary-800 tracking-tight">
              MedicalBlocks
            </span>
          </div>

          <nav
            className="flex flex-col flex-grow px-4 mt-6 space-y-2 overflow-y-auto"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium
                   focus:outline-none focus-visible:ring-0
                   ${isActive ? activeClass : inactiveClass}`
                }
              >
                <span className="flex-shrink-0" style={{ color: 'inherit' }} aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
