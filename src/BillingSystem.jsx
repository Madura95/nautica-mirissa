import React, { useEffect, useState } from "react";
import Header from "./Header";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import './BillingSystem.css';

const BillingSystem = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [billItem, setBillItem] = useState([]);
  const [serviceCharge,setServiceCharge]=useState(0)



  const calculateSubtotal=()=>{
    return billItem.reduce((acc,item)=>acc+item.price*item.quantity,0)
  }

  const calculateTotal=()=>{
    const subtotal=calculateSubtotal()
    return subtotal+(subtotal * serviceCharge/100)
  }

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'menu'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleSelectedItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(e.target.value);
  };

  const handleServiceChargeChange =(e)=>{
    setServiceCharge(e.target.value)
  }

  const handleAddItem = () => {
    const itemToAdd = menuItems.find(item => item.id === selectedItem);
    if (itemToAdd) {
      const newItem = {
        ...itemToAdd,
        quantity: selectedQuantity,
        serviceCharge:serviceCharge,
      };
      setBillItem([...billItem, newItem])
      setSelectedItem("");
      setSelectedQuantity(1)
    }
  };

  const handleDelete = (index) => {
    const updatedBillItems = billItem.filter((_, i) => i !== index);
    setBillItem(updatedBillItems);
  };

  const handleFinish = async () => {
    const billData={
      items:billItem,
      serviceCharge:calculateSubtotal()*serviceCharge/100,
      subtotal:calculateSubtotal(),
      total:calculateTotal(),
      date:new Date().toISOString()
    }

    try{
      await addDoc(collection(firestore,"bills"),billData);
      alert("Bill Sucsessfully Saved!")
      setBillItem([])
      setServiceCharge(0)
    }catch(error){
      alert("Failed to save bill. Please try again",error)
    }
    
    console.log("Bill finalized with items:", billItem);
  };

  const handleCancel = () => {
    // Implement cancel logic (e.g., clear items, etc.)
    console.log("Bill canceled");
    setBillItem([]);
  };

  return (
    <>
      <Header />
      <div className="billing-page">
        <div className="left-div">
          <h2>Billing System</h2>

          <div className="form-group">
            <label htmlFor="menuItemSelect">Select Item:</label>
            <select
              id="menuItemSelect"
              value={selectedItem}
              onChange={handleSelectedItemChange}
              className="menu-select"
            >
              <option value="">Select a menu item</option>
              {menuItems.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title} - Rs {item.price}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantitySelect">Select Quantity:</label>
            <select
              id="quantitySelect"
              value={selectedQuantity}
              onChange={handleQuantityChange}
              className="quantity-select"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((quantity) => (
                <option value={quantity} key={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
          </div>

          <button className="add-button" onClick={handleAddItem}>Add Item</button>

          {billItem.length > 0 && (
            <div className="bill-items">
              {billItem.map((item, index) => (
                <div key={index} className="bill-item">
                  <p>
                    {item.title} - Rs {item.price} x {item.quantity}
                  </p>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="right-div">
          <h2>Bill Preview</h2>
          {billItem.length > 0 && (
            <>
              <div className="bill-preview-items">
                {billItem.map((item, index) => (
                  <div key={index} className="bill-preview-item">
                    <p>
                      {item.title} - Rs {item.price} x {item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="form-group">
            <label htmlFor="serviceChargeSelect">Select Service Charge:</label>
            <select
              id="serviceChargeSelect"
              value={serviceCharge}
              onChange={handleServiceChargeChange}
              className="service-charge-change"
            >
              <option value="0">No Service Charge</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
            </select>
          </div>

          <div className="totals">
            <p>Subtotal: Rs {calculateSubtotal()}.00</p>
            <p>Service Charge: Rs {calculateSubtotal()*serviceCharge/100}.00</p>
            <p>Total: Rs {calculateTotal()}.00</p>
          </div>

              <button className="finish-button" onClick={handleFinish}>Finish</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel Bill</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BillingSystem;
