import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";
import Layout from "../components/Layout";
import Home from "../components/Home/Home";
import OTP from "../pages/OTP/OtpPage";
import LoginPage from "../pages/Login/LoginPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import PrivateRoute from "../components/PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
const RouterConfig = () => {
  return (
    
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/login" element={<LoginPage />} />
        
       



        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/updateprofile" element={
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        } 
        />
          <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } 
        />
        </Route>
      </Routes>
  );
};
export default RouterConfig;
