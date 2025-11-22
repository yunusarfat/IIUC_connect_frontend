import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, LucideLink } from 'lucide-react';
import { Link } from 'react-router-dom';



const FooterLink = ({ children, to }) => (
  <Link to={to} className="text-white/70 hover:text-white transition duration-300 relative group overflow-hidden text-sm">
    <span className="relative z-10">{children}</span>
    {/* Subtle holographic underline effect */}
    <motion.span 
      className="absolute bottom-0 left-0 h-px bg-indigo-400 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
      style={{ originX: 0 }}
    />
  </Link>
);

const Footer = () => {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("accessToken");
  navigate("/login");
};
  return (
    // Outer container with a dark background to make the glass effect pop
    <footer className="relative bg-gray-900  pt-16 pb-8 overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* Background blobs for aesthetic effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      {/* Glassmorphic Footer Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
        // Glassmorphism styles: backdrop-blur, border, low opacity background
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-xl bg-white/5 border-t border-b border-white/20 shadow-2xl rounded-t-3xl p-8 transform translateZ(50px)"
      >

        {/* Glowing Box Shadow Effect */}
        <div 
          className="absolute inset-0 rounded-t-3xl pointer-events-none"
          style={{ 
              boxShadow: ' 0 0 30px rgba(59, 130, 246, 0.3) inset'
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
          
          {/* 1. Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link className="h-8 w-auto mr-3 text-indigo-400" />
              <span className="text-2xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-blue-400">
                IIUC Connect
              </span>
            </div>
            <p className="text-white/70 text-sm">
              Connecting alumni worldwide through events, job opportunities, and memories.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold mb-4 text-md">Explore</h4>
            <ul className="space-y-3">
              <li><FooterLink to="/events">Events</FooterLink></li>
              <li><FooterLink to="/job-board">Job Board</FooterLink></li>
              <li><FooterLink to="/blog">Blog</FooterLink></li>
              <li><FooterLink to="/about">About Us</FooterLink></li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold mb-4 text-md">Contact</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-blue-400" /> 
                123 Alumni Ave, Chattogram, BD
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-blue-400" /> 
                <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-blue-400" /> 
                <a href="mailto:info@alumni.com" className="hover:text-white transition">info@alumni.com</a>
              </li>
            </ul>
          </div>
          
          {/* 4. Connect & Socials */}
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold mb-4 text-md">Stay Connected</h4>
            <div className="flex space-x-4">
              <motion.a href="#" whileHover={{ scale: 1.2, color: '#6366F1' }} className="text-white/70 hover:text-indigo-500"><Facebook className="h-6 w-6" /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, color: '#3B82F6' }} className="text-white/70 hover:text-blue-500"><Twitter className="h-6 w-6" /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.2, color: '#4F46E5' }} className="text-white/70 hover:text-indigo-600"><Linkedin className="h-6 w-6" /></motion.a>
              
            </div>
            <button
  onClick={handleLogout}
  className="mt-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
>
  Logout
</button>
           
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} IIUC Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs">
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Global CSS for 3D Transform utility */}
      <style>{`
          .transform-style-preserve-3d {
              transform-style: preserve-3d;
          }
          .translateZ-10 {
              transform: translateZ(10px);
          }
          .translateZ-20 {
              transform: translateZ(20px);
          }
          .translateZ-40 {
              transform: translateZ(40px);
          }
          .translateZ-50 {
            transform: translateZ(50px);
          }
      `}</style>
    </footer>
  );
};

export default Footer;
