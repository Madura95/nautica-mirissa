import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import App from './App.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Menu from './Menu.jsx';
import Login from './Login.jsx';
import Admin from './Admin.jsx';
import ManageMenu from './ManageMenu.jsx';
import ManageUsers from './ManageUsers.jsx';
import BillingSystem from './BillingSystem.jsx';
import ManageBills from './ManajeBills.jsx';

createRoot(document.getElementById('root')).render(
<Router>
  <Routes>
    <Route path="/" element={<App/>}/>
    <Route path="/menu" element={<Menu/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='admin/menu' element={<ManageMenu/>}/>
    <Route path='admin/users' element={<ManageUsers/>}/>
    <Route path='/billing' element={<BillingSystem/>}/>
    <Route path='/admin/billManage' element={<ManageBills/>}/>

  </Routes>
</Router>
)
