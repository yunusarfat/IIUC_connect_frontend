import React from 'react';
import  { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Hash, BookOpen, Lock, LogIn, ArrowRight } from 'lucide-react';

// --- Reusable Components (Styling Abstraction) ---

const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-2xl rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

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

const Select = React.forwardRef(({ icon: Icon, className = '', children, ...props }, ref) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />}
    <select
      ref={ref}
      className={`w-full py-3 px-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition duration-150 ease-in-out text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
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
        Creating Account...
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

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    student_id: '',
    email: '',
    name: '',
    password: '',
    role: 'student',
    department: '', // must be ID
  });

  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // 🔥 Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await api.get('/accounts/departments/');
        setDepartments(res.data);
      } catch (err) {
        console.error("Failed to load departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Backend requires multipart/form-data
      const form = new FormData();
      form.append("student_id", formData.student_id);
      form.append("email", formData.email);
      form.append("name", formData.name);
      form.append("password", formData.password);
      form.append("role", formData.role);
      form.append("department", formData.department); // ID sent

      const response = await api.post('/accounts/register/', form);

      console.log("Registration successful:", response.data);
      setSuccessMessage("Registration successful! Redirecting to OTP...");

      setTimeout(() => {
        navigate("/otp", { state: { email: formData.email } });
      }, 2000);

    } catch (err) {
      console.error("Registration failed:", err.response || err.message);
      if (err.response && err.response.data) {
        setError(Object.values(err.response.data).flat().join(' '));
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.div
        className="flex w-full max-w-4xl shadow-2xl rounded-xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT PANEL — Styled with gradient and icons */}
        <div className="hidden md:block md:w-5/12 bg-gradient-to-b from-indigo-700 to-purple-800 p-8 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-4">Join Our Alumni Network</h2>
          <p className="mb-8 opacity-90 text-sm">Connect with peers, find jobs, and access exclusive events. Your university journey continues here.</p>
          <div className="space-y-4">
            <div className="flex items-center"><User className="mr-3 h-5 w-5 text-indigo-200" /> <span className="font-semibold">Verified Alumni Status</span></div>
            <div className="flex items-center"><BookOpen className="mr-3 h-5 w-5 text-indigo-200" /> <span className="font-semibold">Exclusive Events & Resources</span></div>
            <div className="flex items-center"><LogIn className="mr-3 h-5 w-5 text-indigo-200" /> <span className="font-semibold">Career Opportunities</span></div>
          </div>
          <p className="mt-12 text-xs opacity-50">By signing up, you agree to our Terms and Privacy Policy.</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-7/12 bg-white p-8 sm:p-10">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h1>

          {/* Messages */}
          <div className="mb-6">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg text-sm"
              >
                {successMessage}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg text-sm"
              >
                {error}
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input icon={User} type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
            </div>

            {/* STUDENT ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <Input icon={Hash} type="text" name="student_id" value={formData.student_id} onChange={handleChange} required placeholder="e.g., 2019-1-60-001" />
            </div>

            {/* DEPARTMENT (dynamic dropdown) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <Select icon={BookOpen} name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </Select>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <Input icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <Select icon={User} name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student/Alumni</option>
                <option value="teacher">Teacher</option>
              </Select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input icon={Lock} type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <Button isLoading={isLoading}>
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-700 transition duration-150">Log in</Link>
          </p>
        </div>
      </motion.div>
      
      {/* Add global styles for custom loader */}
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

export default RegisterPage;
