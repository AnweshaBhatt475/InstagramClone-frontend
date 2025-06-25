// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import { PostProvider } from './context/PostContext'

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <PostProvider>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/create" element={<CreatePostPage />} />
//           </Routes>
//         </PostProvider>
//       </AuthProvider>
//     </Router>
//   )
// }

// export default App
import React from 'react';
import ErrorBoundary from "./components/ErrorBoundary"; // Adjust path if needed
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreatePostPage from './pages/CreatePostPage'
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/common/ProtectedRoute'


function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <PostProvider>
            <Routes>
               <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
              <Route path='/login' element={<ProtectedRoute requireAuth={false}><LoginPage/></ProtectedRoute>}/>
              <Route path='/signup' element={<ProtectedRoute requireAuth={false}><SignupPage/></ProtectedRoute>}/>
              <Route path="/create" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/profile/:userId" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> 
            </Routes>
          </PostProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;