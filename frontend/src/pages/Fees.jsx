// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import '../assets/CSS/fees.css';

// function FeesPage() {
//     const { userID } = useParams();
//     const [fees, setFees] = useState(null);
//     const [newAmount, setNewAmount] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch fees information for the specified user from the backend
//         axios.get(`http://localhost:8000/fees/${userID}`)
//             .then(response => {
//                 setFees(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching fees information:', error);
//                 setLoading(false);
//             });
//     }, [userID]);

//     const handlePayment = () => {
//         // Placeholder for payment handling
//         console.log('Payment button clicked');
//     };

//     const handleSubmit = () => {
//         // Update due amount for the student
//         axios.put(`http://localhost:8000/fees/${userID}`, { dueAmount: newAmount })
//             .then(response => {
//                 console.log('Due amount updated successfully:', response.data);
//                 setFees(prevState => ({
//                     ...prevState,
//                     due_amount: newAmount
//                 }));
//             })
//             .catch(error => {
//                 console.error('Error updating due amount:', error);
//             });
//     };

//     const handleInputChange = (event) => {
//         setNewAmount(event.target.value);
//     };

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : fees ? (
//                 <div>
//                     <h1>Fees Information for User ID: {userID}</h1>
//                     <p><strong>Dining Fee:</strong> ${fees.dining_fee}</p>
//                     <p><strong>Hall Fee:</strong> ${fees.hall_fee}</p>
//                     <p><strong>Registration Fee:</strong> ${fees.registration_fee}</p>
//                     <p><strong>Due Amount:</strong> ${fees.due_amount}</p>
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="newAmount">Enter New Amount:</label>
//                         <input type="number" id="newAmount" value={newAmount} onChange={handleInputChange} />
//                         <button type="submit">Submit</button>
//                     </form>
//                     <button onClick={handlePayment}>Pay Now</button>
//                 </div>
//             ) : (
//                 <p>No fees information found for User ID: {userID}</p>
//             )}
//         </div>
//     );
// }

// export default FeesPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../assets/CSS/fees.css';

function FeesPage() {
    const { userID } = useParams();
    const [fees, setFees] = useState(null);
    const [newAmount, setNewAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // State variable to toggle form visibility

    useEffect(() => {
        // Fetch fees information for the specified user from the backend
        axios.get(`http://localhost:8000/fees/${userID}`)
            .then(response => {
                setFees(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching fees information:', error);
                setLoading(false);
            });
    }, [userID]);

    const handlePayment = () => {
        // Placeholder for payment handling
        console.log('Payment button clicked');
        setShowForm(true); // Show the form after clicking the payment button
    };

    const handleSubmit = () => {
        // Update due amount for the student
        axios.put(`http://localhost:8000/fees/${userID}`, { dueAmount: newAmount })
            .then(response => {
                console.log('Due amount updated successfully:', response.data);
                setFees(prevState => ({
                    ...prevState,
                    due_amount: newAmount
                }));
            })
            .catch(error => {
                console.error('Error updating due amount:', error);
            });
    };

    const handleInputChange = (event) => {
        setNewAmount(event.target.value);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : fees ? (
                <div>
                    <h1>Fees Information for User ID: {userID}</h1>
                    <p><strong>Dining Fee:</strong> ${fees.dining_fee}</p>
                    <p><strong>Hall Fee:</strong> ${fees.hall_fee}</p>
                    <p><strong>Registration Fee:</strong> ${fees.registration_fee}</p>
                    <p><strong>Due Amount:</strong> ${fees.due_amount}</p>
                    {showForm && (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="newAmount">Enter New Amount:</label>
                            <input type="number" id="newAmount" value={newAmount} onChange={handleInputChange} />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    {!showForm && <button onClick={handlePayment}>Pay Now</button>}
                </div>
            ) : (
                <p>No fees information found for User ID: {userID}</p>
            )}
        </div>
    );
}

export default FeesPage;
