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
        return 'bg-blue-200 text-blue-800';
      case 'tutor':
        return 'bg-green-200 text-green-800';
      case 'hod':
        return 'bg-yellow-200 text-yellow-800';
      case 'chief_proctor':
        return 'bg-purple-200 text-purple-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <nav className="bg-[#3C3489] text-white px-6 py-4 shadow-md w-full flex flex-row justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex flex-row gap-3 items-center">
        <div className="bg-white text-[#3C3489] rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm">
          PU
        </div>
        <span className="font-semibold text-white text-lg">S18 Portal</span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-row items-center">
        {user && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">{user.name}</span>
            {user.role && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${getRoleBadgeClass(user.role)}`}>
                {user.role.replace('_', ' ')}
              </span>
            )}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-white text-[#3C3489] text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-gray-100 transition ml-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
