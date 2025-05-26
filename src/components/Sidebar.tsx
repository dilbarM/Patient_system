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
      {/* Overlay for mobile only */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Sidebar for mobile */}
      <aside
        aria-label="Sidebar"
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-2xl font-extrabold text-primary-800 tracking-tight">Medblocks</h1>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-2 rounded-md text-gray-500 hover:text-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 px-4 space-y-2" aria-label="Main navigation">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-0 ${isActive ? activeClass : inactiveClass
                }`
              }
            >
              <span aria-hidden="true" className="flex-shrink-0" style={{ color: 'inherit' }}>
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Sidebar for desktop */}
      <aside
        aria-label="Sidebar"
        className="hidden md:flex md:flex-shrink-0"
      >
        <div className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-md">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-2xl font-extrabold text-primary-800 tracking-tight">MedicalBlocks</h1>
          </div>

          <nav
            className="flex flex-col flex-grow mt-6 px-4 space-y-2 overflow-y-auto"
            aria-label="Main navigation"
          >
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-0 ${isActive ? activeClass : inactiveClass
                  }`
                }
              >
                <span aria-hidden="true" className="flex-shrink-0" style={{ color: 'inherit' }}>
                  {icon}
                </span>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
