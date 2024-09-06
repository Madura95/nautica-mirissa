
import Header from "./Header";
import React, { useState, useEffect } from 'react';
import { collection, getDocs,doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import './Managemenu.css';

const ManageMenu =()=>{

    const[menuItems,setMenuItems]=useState([])
    const[editItem,setEditItems]=useState(null)
    const[newItem,setNewItem]=useState({
        title:'',
        description:'',
        price:'',
        category:''
    })
    const [categories,setCategories]=useState(['Main Course','Dessert','Addons','Coktail','Juice','Soft Drinks', 'Beer'])

    const handleNewItemChange =(e)=>{
        const{name,value}=e.target
        setNewItem({...newItem,[name]:value})
    }

    const handleAdd= async(e)=>{
        e.preventDefault()
        try{
            await addDoc(collection(firestore,'menu'),newItem)
            alert('Menu Item Add Successfully!')
            setNewItem({
                title:'',
                description:'',
                price:'',
                category:''
            })
            const updatedItems=await getDocs(collection(firestore,'menu'))
            setMenuItems(updatedItems.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            })))
        }catch (error){
            console.error('Error',error)
            alert('Failed to add menu item')
        }
    }

    const handleEditChange=(e)=>{
        const {name, value}=e.target
        setEditItems({...editItem,[name]:value})
    }

    const handleUpdate=async (e)=>{
        e.preventDefault()
        try{
            await updateDoc(doc(firestore,'menu', editItem.id),editItem)
            alert("Menu Item Updated Successfully!")
            setEditItems(null)

            const updatedItems=menuItems.map(item=>item.id===editItem.id?editItem:item)
            setMenuItems(updatedItems)
        }catch(error){
            console.error("Error:",error)
            alert('Failed to Update Menu Items')
        }
    }

    const handleEdit= (item)=>{
        setEditItems(item)
    }

    const handleDelete=async(id)=>{
        try{
            await deleteDoc(doc(firestore,'menu',id))
            alert("Menu Item Deleted Successfully")
            setMenuItems(menuItems.filter(item=> item.id !== id))
        } catch(error){
            console.error("Error:",error)
            alert("Failed to delete menu item.")
        }
    }

    useEffect(()=>{
        const fetchMenuItems=async()=>{
           try {const querySnapshot=await getDocs(collection(firestore,'menu'))
            const items=querySnapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }))
            setMenuItems(items)
        }catch(error){
            console.error("Error:",error)
        }
        }

        fetchMenuItems()
    },[])

    return(
        <>
        <Header/>
        <div className="manage-menu">
            <h1>Manage Menu</h1>
            <div className="form-container">
                <h2>Add New Menu Item</h2>
                <form onSubmit={handleAdd}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input 
                            type="text"
                            id="title"
                            name="title"
                            value={newItem.title}
                            onChange={handleNewItemChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input 
                            type="text"
                            id="description"
                            name="description"
                            value={newItem.description}
                            onChange={handleNewItemChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input 
                            type="text" 
                            id="price"
                            name="price"
                            value={newItem.price}
                            onChange={handleNewItemChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select 
                            name="category" 
                            id="category"
                            value={newItem.category}
                            onChange={handleNewItemChange}
                        >
                            <option value="">Select a Category</option>
                            {categories.map(cat=>(
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Add Item</button>
                </form>
            </div>
            <div className="menu-items">
                {menuItems.length?(
                    menuItems.map(item=>(
                        <div className="menu-i" key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <p>Price: Rs{item.price}</p>
                            <p>Category: {item.category}</p>
                            <button onClick={()=>handleEdit(item)}>Edit</button>
                            <button onClick={()=>handleDelete(item.id)}>Delete</button>
                        </div>
                    ))
                ):(<p>No Menu items available</p>)
                }
                {editItem && (
                    <div className="edit-form">
                        <h2>Edit Menu Item</h2>
                        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editItem.title}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={editItem.description}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editItem.price}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={editItem.category}
              onChange={handleEditChange}
              required
            />
          </div>
          <button type="submit">Update Item</button>
        </form>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}
export default ManageMenu