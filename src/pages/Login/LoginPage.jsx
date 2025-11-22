import React, { useState } from "react";
import api from "../../api/api"; // adjust path if needed
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

// --- Reusable Components (Styling Abstraction) ---

const Input = React.forwardRef(({ icon: Icon, className = '', ...props }, ref) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
    <input
      ref={ref}
      className={`w-full py-3 px-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-sm ${className}`}
      {...props}
    />
  </div>
));

const Button = ({ children, isLoading, ...props }) => (
  <motion.button
    type="submit"
    variants={{ hover: { scale: 1.02 }, tap: { scale: 0.98 } }}
    whileHover="hover"
    whileTap="tap"
    disabled={isLoading}
    className="w-full flex items-center justify-center py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:shadow-lg"
    {...props}
  >
    {isLoading ? (
      <>
        <div className="loader mr-2"></div>
        Logging In...
      </>
    ) : (
      <>
        {children}
        <ArrowRight className="ml-2 h-4 w-4" />
      </>
    )}
  </motion.button>
);

// --- Main Component ---

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    try {
      const response = await api.post("/accounts/login/", formData);
  
      console.log("LOGIN RESPONSE FULL:", response.data);
  
      const accessToken = response.data.token; // backend returns "token"
      const user = response.data.user;
  
      if (!accessToken) {
        setError("Backend did not return token!");
        return;
      }
  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
  
      navigate("/profile"); // redirect to profile page
  
    } catch (err) {
      console.error("Login failed:", err.response || err.message);
  
      if (err.response?.data) {
        setError(Object.values(err.response.data).flat().join(" "));
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.div
        className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 sm:p-10"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <LogIn className="h-10 w-10 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-1">Sign in to your alumni account</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              icon={Mail}
              type="email"
              name="email"
              placeholder="example@ugrad.iiuc.ac.bd"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input
              icon={Lock}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Action Links */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button isLoading={isLoading}>
              Login to Account
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150">
            Create one
          </Link>
        </p>
      </motion.div>

      {/* Loader Style */}
      <style>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
