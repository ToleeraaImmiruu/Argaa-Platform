// ... other imports
import CreateTourPage from './pages/CreateTourPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './index.css'; 
import { Toaster } from 'react-hot-toast'; 
import AdminDashboard from './pages/AdminDashboard';
import AdminTourDetailPage from './pages/AdminTourDetailPage';
import TourDetailPage from './pages/TourDetailPage'; 
import Chatbot from './components/Chatbot';
import { AnimatePresence } from 'framer-motion';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import CustomToursPage from './pages/CustomToursPage';
import CreateCustomTourPage from './pages/CreateCustomTourPage';
import CustomTourDetailPage from './pages/CustomTourDetailPage';
import AdminCustomTourDetailPage from './pages/AdminCustomTourDetailPage'; 
import MyBookingsPage from './pages/MyBookingsPage';
import EditTourPage from './pages/EditTourPage';
import AboutPage from './pages/AboutPage';

// We can now remove the placeholder from AdminDashboard.jsx and use the real one

const MyToursPage = () => <div className="p-10"><h2>My Tours Page</h2><p>This page will show a list of tours created by the guide.</p></div>;

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            {/* Public and Role-Dispatching Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/tours/:id" element={<TourDetailPage />} /> 
            <Route path="/tours/:id/manage" element={<TourDetailPage />} />
            <Route 
                path="/my-bookings" 
                element={
                <ProtectedRoute allowedRoles={['tourist']}>
                    <MyBookingsPage />
                </ProtectedRoute>
                } 
            />
        
            <Route 
                path="/my-tours" 
                element={
                <ProtectedRoute allowedRoles={['guide']}>
                    <MyToursPage />
                </ProtectedRoute>
                } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/tours" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/tours/:id" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminTourDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/custom-tours/:id" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminCustomTourDetailPage />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/admin-panel" 
              element={
              <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
              </ProtectedRoute>
              } 
            />
            {/* Protected Routes for Guides */}
            <Route 
              path="/create-tour" 
              element={
                <ProtectedRoute allowedRoles={['guide']}>
                  <CreateTourPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tours/:id/edit" 
              element={
                <ProtectedRoute allowedRoles={['guide', 'admin']}>
                  <EditTourPage />
                </ProtectedRoute>
              } 
            />
            {/* Custom Tour Routes */}
            <Route path="/custom-tours" element={<CustomToursPage />} />
            <Route path="/custom-tours/new" element={
              <ProtectedRoute allowedRoles={['tourist', 'guide', 'admin']}>
                <CreateCustomTourPage />
              </ProtectedRoute>
            } />
            <Route path="/custom-tours/:id" element={<CustomTourDetailPage />} />
                  
            {/* A catch-all for 404 Not Found pages */}
            <Route path="*" element={<div className="text-center p-10"><h2>404: Page Not Found</h2></div>} />
            </Routes>
            </Layout>
            <AnimatePresence>
                {isChatOpen && <Chatbot closeChat={() => setIsChatOpen(false)} />}
            </AnimatePresence>
            
            <button onClick={() => setIsChatOpen(prev => !prev)}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg z-40 transform transition-transform hover:scale-110">
                <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
            </button>
      </Router>
    </AuthProvider>
  );
}

export default App;


// // ... other imports

// // ...

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Layout>
//           <Toaster position="top-center" reverseOrder={false} /> {/* Add Toaster here */}
//           <Routes>
//             {/* Public and Role-Dispatching Routes */}
//             <Route path="/" element={<HomePage />} />
//             {/* ... login/signup routes */}

//             {/* Admin Routes */}
//             <Route 
//               path="/admin/tours" 
//               element={
//                 <ProtectedRoute allowedRoles={['admin']}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               } 
//             />
//             <Route 
//               path="/admin/tours/:id" 
//               element={
//                 <ProtectedRoute allowedRoles={['admin']}>
//                   <AdminTourDetailPage />
//                 </ProtectedRoute>
//               } 
//             />

//             {/* ... other protected routes for guides etc. */}
            
//             <Route path="*" element={<div className="text-center p-10"><h2>404: Page Not Found</h2></div>} />
//           </Routes>
//         </Layout>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
