// import React from 'react';

// import { Link } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'

// function Navbar() {
//   const { user, logout } = useAuth()

//   const handleLogout = () => {
//     logout()
//   }

//   return (
// <nav className="bg-gradient-to-r from-blue-50 to-blue-200 border-b border-gray-300 sticky top-0 z-50 shadow-md">
//   <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
//     {/* Title with Better Contrast */}
//     <Link to="/" className="text-2xl font-semibold italic text-blue-800 hover:text-blue-600 transition-all">Instagram</Link>

//     {/* Navigation Links */}
//     <div className="flex gap-6">
//       {user ? (
//         <>
//           <Link to="/" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Home</Link>
//           <Link to="/create" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Create</Link>
//           <Link to="/profile" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Profile</Link>
//           <button
//             onClick={handleLogout}
//             className="text-sm text-gray-900 hover:text-red-500 font-medium transition-all"
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <Link to="/login" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Login</Link>
//       )}
//     </div>
//   </div>
// </nav>


//   )
// }

// export default Navbar
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const logoSrc = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"; // Use a valid logo URL

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-50 to-blue-200 border-b border-gray-300 sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img src={logoSrc} alt="Instagram Logo" className="w-10 h-10 object-contain" />
          <Link to="/" className="text-2xl font-semibold italic text-blue-800 hover:text-blue-600 transition-all">
            Instagram
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          {user ? (
            <>
              <Link to="/" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Home</Link>
              <Link to="/create" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Create</Link>
              <Link to="/profile" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Profile</Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-900 hover:text-red-500 font-medium transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-gray-900 hover:text-blue-600 font-medium transition-all">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;