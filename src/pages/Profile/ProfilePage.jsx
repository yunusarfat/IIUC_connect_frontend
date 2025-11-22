import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import pic from "./default_pic.jpg"; // adjust path if needed
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Mail, Hash, BookOpen, GraduationCap, CheckCircle, XCircle, Edit2, LogOut, Loader2 } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const defaultPic = pic;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get("/accounts/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data.");
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateX: 10 },
    visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.8, type: "spring", stiffness: 60 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
        <p className="ml-3 text-white">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4" style={{ perspective: '1000px' }}>
      <motion.div
        className="max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 transform-style-preserve-3d relative overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ rotateX: 2, rotateY: -2, boxShadow: '0 0 80px rgba(99, 102, 241, 0.5)' }}
      >
        {/* Holographic Glow BG */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: '0 0 50px rgba(99, 102, 241, 0.3) inset' }} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          
          {/* Profile Picture */}
          <motion.div 
            className="w-48 h-48 rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src={profile.profile_picture || defaultPic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Profile Details */}
          <div className="flex-grow space-y-4 text-white">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              {profile.name}
            </h1>
            
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-3">
              <p className="flex items-center text-gray-300"><Mail className="w-4 h-4 mr-3 text-indigo-400" /> Email: {profile.email}</p>
              <p className="flex items-center text-gray-300"><Hash className="w-4 h-4 mr-3 text-indigo-400" /> Student ID: {profile.student_id}</p>
              <p className="flex items-center text-gray-300"><GraduationCap className="w-4 h-4 mr-3 text-indigo-400" /> Role: {profile.role}</p>
              <p className="flex items-center text-gray-300"><BookOpen className="w-4 h-4 mr-3 text-indigo-400" /> Department: {profile.department}</p>
              {/* <p className="flex items-center text-gray-300"><Calendar className="w-4 h-4 mr-3 text-indigo-400" /> Batch: {profile.batch || "N/A"}</p> */}
              
              <div className="flex items-center text-sm pt-2">
                {profile.is_verified ? (
                  <span className="flex items-center text-green-400 bg-green-900/50 px-3 py-1 rounded-full"><CheckCircle className="w-3 h-3 mr-2" /> Verified</span>
                ) : (
                  <span className="flex items-center text-red-400 bg-red-900/50 px-3 py-1 rounded-full"><XCircle className="w-3 h-3 mr-2" /> Unverified</span>
                )}
                <span className="ml-4 flex items-center text-gray-400">
                    {profile.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Buttons (Update and Logout) */}
        <motion.div 
            className="mt-8 flex justify-end gap-4 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
          {/* Update Button */}
          <Link to="/updateprofile">
            <motion.button 
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:shadow-blue-500/50 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Edit2 className="w-4 h-4 mr-2" /> Update Profile
            </motion.button>
          </Link>

          {/* Logout Button */}
          <motion.button 
            onClick={handleLogout}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg shadow-lg transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </motion.button>
        </motion.div>

      </motion.div>
       {/* Global CSS for 3D Transform utility */}
       <style>{`
        .transform-style-preserve-3d {
            transform-style: preserve-3d;
        }
        /* Assuming you have default_pic.jpg available in the same directory */
        /* If not, ensure the path is correct or replace 'pic' import with a URL string */
    `}</style>
    </div>
  );
};

export default ProfilePage;
