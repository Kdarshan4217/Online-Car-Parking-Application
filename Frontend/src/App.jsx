import { Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar";

import Home from "./Components/Home/Home";
import UserDetails from "./Components/AdminComponent/UserDetails";
import SecurityDetails from "./Components/AdminComponent/SecurityDetails";
import ParkingAreaDetails from "./Components/AdminComponent/ParkingAreaDetails";
import ParkingZoneDetails from "./Components/AdminComponent/ParkingZoneDetails";
import ParkingSlotDetails from "./Components/AdminComponent/ParkingSlotDetails";
import CarDetails from "./Components/AdminComponent/CarDetails";
import FeedbackDetails from "./Components/AdminComponent/FeedbackDetails";
import AddSecurity from "./Components/AdminComponent/AddSecurity";
import AddArea from "./Components/AdminComponent/AddArea";
import AddZone from "./Components/AdminComponent/AddZone";
import AddSlot from "./Components/AdminComponent/addSlot";

import Contact from "./Components/ContactUs/contact";

import Footer from "./Components/Footer";
import Login from "./Components/Login/login";
import AboutUs from "./Components/About/about";
import UserDashboard from "./Components/UserComponent/UserDashboard";
import RegisterForm from "./Components/Login/register";
import AdminDashboard from "./Components/AdminComponent/AdminDashboard";
import SecurityDashboard from "./Components/SecurityComponent/SecurityDashboard";
import UpdateUser from "./Components/UserComponent/UpdateUser";
import DateTimePicker from "./Components/UserComponent/SelectTime";
import ZoneDashboard1 from "./Components/UserComponent/ZoneDashboard1";
import CarDashboard1 from "./Components/UserComponent/CarDashboard";
import BookingDetails from "./Components/UserComponent/BookingDetails";
import ParkingReceipt from "./Components/UserComponent/ParkingReceipt";
import ParkingDetailsAdmin from "./Components/AdminComponent/ParkingDetailsAdmin";
import ParkingDetailsUser from "./Components/UserComponent/ParkingDetailsUser";
import GetCar from "./Components/UserComponent/GetCar";
import AddCar from "./Components/UserComponent/AddCar";
import AddAdmin from "./Components/AdminComponent/AddAdmin";
import Payment from "./Components/UserComponent/Payment";
import ProtectedRoute from "./Protectedroute";


function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<RegisterForm />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route element={<ProtectedRoute />}> */}
          {/* <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/securityDashboard" element={<SecurityDashboard />} />
          <Route path="/userDashboard" element={<UserDashboard />} /> */}

          {/* </Route> */}


          <Route path="/adminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/securityDashboard" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
          <Route path="/userDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        

          <Route path="/user" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />


          <Route path="/security" element={<ProtectedRoute><SecurityDetails /></ProtectedRoute>} />
          <Route path="/adminparking" element={<ProtectedRoute><ParkingDetailsAdmin /></ProtectedRoute>} />
          <Route path="/userparking" element={<ProtectedRoute><ParkingDetailsUser /></ProtectedRoute>} />
          <Route path="/area" element={<ProtectedRoute><ParkingAreaDetails /></ProtectedRoute>} />
          <Route path="/zone" element={<ProtectedRoute><ParkingZoneDetails /></ProtectedRoute>} />
          <Route path="/slot" element={<ProtectedRoute><ParkingSlotDetails /></ProtectedRoute>} />
          <Route path="/car" element={<ProtectedRoute><CarDetails /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><FeedbackDetails /></ProtectedRoute>} />
          <Route path="/addsecurity" element={<ProtectedRoute><AddSecurity /></ProtectedRoute>} />
          <Route path="/addarea" element={<ProtectedRoute><AddArea /></ProtectedRoute>} />
          <Route path="/addzone" element={<ProtectedRoute><AddZone /></ProtectedRoute>} />
          <Route path="/addslot" element={<ProtectedRoute><AddSlot /></ProtectedRoute>} />
          <Route path="/updateuser" element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
          <Route path="/book" element={<ProtectedRoute><DateTimePicker /></ProtectedRoute>} />
          <Route path="/tozone" element={<ProtectedRoute><ZoneDashboard1 /></ProtectedRoute>} />
          <Route path="/cardashboard" element={<ProtectedRoute><CarDashboard1 /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/bookingdetails" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
          <Route path="/parkingreceipt" element={<ProtectedRoute><ParkingReceipt /></ProtectedRoute>} />
          <Route path="/getcar" element={<ProtectedRoute><GetCar /></ProtectedRoute>} />
          <Route path="/addcar" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/addadmin" element={<ProtectedRoute><AddAdmin /></ProtectedRoute>} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
