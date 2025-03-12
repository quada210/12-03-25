import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Nb from './Components/Nb';
import Admin_Signup from './Components/Admin_signup';
import Admin_Login from './Components/Admin_login';
import AddUsers from './Components/AddUsers';
import Common from './Components/Common';
import Viewmediuser from './Components/Viewmediuser';
import Viewfooduser from './Components/Viewfooduser';
import AddMedi from './Components/Addmedi';
import Viewmedi from './Components/Viewmedi';
import AdminHome from './Components/Home';
import Fhome from './Components/Fhome';
import Mhome from './Components/Mhome';
import Mnb from './Components/Mnb';
import Mlogin from './Components/Mlogin';
import Fnb from './Components/Fnb';
import Amv from './Components/Amv';
import Viewfood from './Components/Viewfood';
import Addfood from './Components/Addfood';
import Contact from './Components/Contact';

import Feedback from './Components/Feedback';
import Orderfood from './Components/Orderfood';
import Ordermedi from './Components/Ordermedi';


function App() {
  return (
    <div className="App">
      <Nb />
      <Mnb />
      <Fnb />
      <Routes>
        <Route path="/" element={<Navigate to="/common" />} />
        <Route path="/admin-signup" element={<Admin_Signup />} />
        <Route path="/admin-login" element={<Admin_Login />} />
        <Route path="/add-users" element={<AddUsers />} />
        <Route path="/common" element={<Common />} />
        <Route path="/foodmanage" element={<Viewfooduser />} />
        <Route path="/medimanage" element={<Viewmediuser />} />
        <Route path="/addmedi" element={<AddMedi />} />
        <Route path="/viewmedi" element={<Viewmedi />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/fhome" element={<Fhome />} />
        <Route path="/mhome" element={<Mhome />} />
        <Route path="/mlogin" element={<Mlogin />} />
        <Route path="/amv" element={<Amv />} />
        <Route path="/viewfood" element={<Viewfood />} />
        <Route path="/addfood" element={<Addfood />} />
        <Route path="/feedbacks" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/orderfood' element={<Orderfood/>}/>
        <Route path='/ordermedi' element={<Ordermedi/>}/>
        </Routes>
    </div>
  );
}

export default App;
