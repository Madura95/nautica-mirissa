import React, { useEffect, useState } from "react";
import Header from "./Header";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import './ManageBills.css'; // You can create this CSS file for styling

const ManageBills = () => {
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'bills'));
                const fetchedBills = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    console.log("Document Data:", data); // Log document data
                    return {
                        id: doc.id,
                        ...data
                    };
                });
                setBills(fetchedBills);
            } catch (error) {
                console.error("Error fetching bills:", error);
            }
        };

        fetchBills();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date"; // Handle missing or undefined dateString

        console.log("Formatting Date:", dateString); // Log dateString for debugging

        const date = new Date(dateString); // Convert ISO string to Date object
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        // Use 'en-GB' locale or any other locale you prefer
        return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB');
    };

    return (
        <>
            <Header />
            <h2>Saved Bills</h2>
            <div className="manage-bills">
                {bills.length > 0 ? (
                    bills.map((bill, index) => (
                        <div key={bill.id} className="bill-item">
                            <h3>Bill {index + 1}</h3>
                            <p>Date & Time: {formatDate(bill.date)}</p> {/* Ensure you're using the correct field */}
                            <div className="bill-preview-items">
                                {bill.items.map((item, idx) => (
                                    <div key={idx} className="bill-preview-item">
                                        <p>
                                            {item.title} - Rs {item.price} x {item.quantity}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="totals">
                                <p>Subtotal: Rs {bill.subtotal}.00</p>
                                <p>Service Charge: Rs {bill.serviceCharge}.00</p>
                                <p>Total: Rs {bill.total}.00</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No saved bills available</p>
                )}
            </div>
        </>
    );
};

export default ManageBills;
