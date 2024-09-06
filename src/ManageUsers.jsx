import React, { useEffect, useState } from "react";
import Header from "./Header";
import './ManageUsers.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "./firebase";

const ManageUsers = () => {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'cashier', 
  });

  const [users, setUsers] = useState([]);  // Initialize the users state

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      const user = userCredential.user;

      // Store user data in Firestore with uid as document ID
      await addDoc(collection(firestore, 'users'), {
        email: newUser.email,
        role: newUser.role,
        uid: user.uid // Save the UID to manage user later if needed
      });

      alert('User added successfully!');
      setNewUser({ email: '', password: '', role: 'cashier' }); // Reset the form fields

      // Fetch and update the users list
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Delete user document from Firestore
      await deleteDoc(doc(firestore, 'users', userId));

      alert('User deleted successfully!');
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="manage-users">
        <form onSubmit={handleAddUser}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleNewUserChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleNewUserChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleNewUserChange}
              required
            >
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>
          <button type="submit">Add User</button>
        </form>

        <h1>Manage Users</h1>
        <div className="users-list">
          {users.length ? (
            users.map(user => (
              <div className="user-item" key={user.id}>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
