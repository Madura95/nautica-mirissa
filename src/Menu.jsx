import React, { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import {firestore} from './firebase'
import Header from "./Header";
import './Menu.css';

const Menu=()=>{

    const [menuItems, setMenuItems]=useState([])

    useEffect(()=>{

        const fetchMenuItems = async ()=>{
            try{
                const querySnapshot= await getDocs(collection(firestore,'menu'))
                console.log("querySnapshot:",querySnapshot)

                const items =querySnapshot.docs.map(doc=>({
                    id: doc.id,
                    ...doc.data()
                }))
                console.log("items:", items);
                
                setMenuItems(items)
            }catch(error){
                console.error("Error fetching menu items:",error)
            }
            
        }
        fetchMenuItems()
    },[])

    return(
        <>
        <Header/>
        <div className="menu-container">
            <h1>Menu</h1>
            <p>Explore our delicious dishes!</p>
            <div className="menu-items">
                {menuItems.length ? (
                    menuItems.map(item => (
                        <div className="menu-item" key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <p>Price: Rs {item.price}</p>
                            <p>Category: {item.category}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading menu items...</p>
                )}
            </div>
        </div>
        </>
    )
}
export default Menu