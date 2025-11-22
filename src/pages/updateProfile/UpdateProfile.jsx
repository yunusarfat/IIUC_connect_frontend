import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import dp from "./default_pic.jpg"; // adjust path as needed
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, BookOpen, GraduationCap, Upload, Loader2, Save } from 'lucide-react';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const defaultPic = dp;

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
        setName(res.data.name || "");
        setDepartment(res.data.department || "");
        setBatch(res.data.batch || "");
        setPreview(res.data.profile_picture || defaultPic);
      } catch (err) {
        console.log(err);
        if (err.response?.status === 403 || err.response?.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("department", department);
    formData.append("batch", batch);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      await api.put("/accounts/me/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage({ type: 'success', text: "Profile updated successfully! Redirecting..." });
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: "Failed to update profile. Please check your inputs." });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <p className="text-white p-4">Loading...</p>;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateX: 10 },
    visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.8, type: "spring", stiffness: 60 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4" style={{ perspective: '1000px' }}>
      <motion.div
        className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 transform-style-preserve-3d relative overflow-hidden"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ rotateX: 1, rotateY: -1, boxShadow: '0 0 80px rgba(99, 102, 241, 0.5)' }}
      >
        {/* Holographic Glow BG */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: '0 0 50px rgba(99, 102, 241, 0.3) inset' }} />

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
            Update Profile
          </h2>

          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 mb-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500' : 'bg-red-500/20 text-red-400 border border-red-500'}`}
            >
              {message.text}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Profile Picture Upload Section */}
            <div className="flex items-center gap-6">
              <motion.img
                src={preview || defaultPic}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-lg"
                whileHover={{ scale: 1.05 }}
              />
              <label className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer shadow-md transition duration-300 transform hover:scale-105">
                <Upload className="w-4 h-4 mr-2" /> Change Picture
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><User className="w-4 h-4 mr-2 text-indigo-400" /> Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            {/* Department Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><BookOpen className="w-4 h-4 mr-2 text-indigo-400" /> Department:</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            {/* Batch Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><GraduationCap className="w-4 h-4 mr-2 text-indigo-400" /> Batch:</label>
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-xl hover:shadow-green-500/50 transition duration-300 mt-4 disabled:opacity-50"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Update Profile
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
      <style>{`
        .transform-style-preserve-3d {
            transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default UpdateProfile;
