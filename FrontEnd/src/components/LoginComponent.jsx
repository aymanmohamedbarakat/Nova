// import React, { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// import { toast } from "react-toastify";
// import { useAuth } from "../store";

// export default function LoginPage() {
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const { login, error, clearError } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get the redirect path from location state or default to homepage
//   const from = location.state?.from || "/";
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
    
//     // Clear any existing errors when user starts typing
//     if (error) clearError();
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       const result = await login(credentials.username, credentials.password);
//       if (result) {
//         toast.success("Login successful!");
//         navigate(from, { replace: true });
//       }
//     } catch (err) {
//       // Error is already handled in the login function and set to state
//       console.error("Login error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 col-lg-5">
//           <div className="card shadow">
//             <div className="card-body p-5">
//               <h2 className="text-center mb-4">Login</h2>
              
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
              
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     name="username"
//                     value={credentials.username}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
                
//                 <div className="d-grid gap-2">
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                         Logging in...
//                       </>
//                     ) : (
//                       "Login"
//                     )}
//                   </button>
//                 </div>
//               </form>
              
//               <div className="mt-4 text-center">
//                 <p>
//                   Don't have an account?{" "}
//                   <Link to="/register" className="text-decoration-none">
//                     Register
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await login(formData.username, formData.password);
    
    if (success) {
      // Redirect back to the page they were trying to access
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username or Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              
              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/register">Register</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;