import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'student':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'tutor':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'hod':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'chief_proctor':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] sticky top-0 z-50 w-full flex flex-row justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex flex-row gap-3.5 items-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/f/f4/Poornima_University.png" 
          alt="PU Logo" 
          className="w-10 h-10 object-cover rounded-full border border-gray-100 shadow-sm"
        />
        <div className="flex flex-col">
          <span className="font-extrabold text-gray-900 tracking-tight leading-tight text-lg">S18 Portal</span>
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Poornima University</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-row items-center gap-5">
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-gray-800 leading-tight">{user.name}</span>
              {user.role && (
                <span className={`mt-1 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border ${getRoleBadgeClass(user.role)}`}>
                  {user.role.replace('_', ' ')}
                </span>
              )}
            </div>
            {/* User Avatar Placeholder */}
            <div className="w-9 h-9 rounded-full bg-[#3C3489] text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        
        <div className="w-px h-8 bg-gray-200"></div>

        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
