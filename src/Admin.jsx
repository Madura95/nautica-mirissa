import React, {useState, useEffect} from "react";
import Header from "./Header";
import './Admin.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Admin =()=>{

    const [user,setUser]=useState(null)
    const navigate = useNavigate()
    const auth =getAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            setError('You need to log in.');
            navigate('/login');
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);
    
      if (error) {
        return (
          <div className="error-container">
            <h1>{error}</h1>
            <a href="/login">Go to Login</a>
          </div>
        );
      }

      const handleLogout=()=>{
        const auth = getAuth()
        signOut(auth)
          .then(()=>{
            alert('You have been logged out')
            navigate("/")
          })
          .catch((error)=>{
            console.error("Error Loginout:",error)
            alert("Failed to log out. Please try again.")
          })
      }
    
    return(
        <>
        <Header />
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <ul>
          <li><Link to="/admin/menu">Manage Menu</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/billing">Billing System</Link></li>
          <li><Link to="/admin/billManage">Manage Bills</Link></li>
          <li><button onClick={handleLogout}>LOG OUT</button></li>
        </ul>
        {user && <p>Welcome, {user.email}</p>}
      </div>
        </>
    )
}
export default Admin