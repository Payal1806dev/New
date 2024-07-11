import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stateManagement/reducers';
import './ViewExpenses.css'; // Import your CSS file

interface Expense {
  _id: string;
  userId: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

const ViewExpenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const userId = useSelector((state: RootState) => state.authReducer.authData.id);

  const handleDelete = async (expenseId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/delete-expense/${expenseId}`);
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error('Failed to delete expense', error);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/expenses/get-expense/${userId}`);
        setExpenses(response.data);
        console.log("Response:", response.data);
      } catch (error) {
        alert('Error fetching expenses');
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [userId]);

  return (
    <div className="view-expenses-container">
      <h2>Expenses</h2>
      <ul className="expenses-list">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense._id} className="expense-item">
              <div>Category: {expense.category}</div>
              <div>Amount: {expense.amount}</div>
              <div>Description: {expense.description}</div>
              <div>Date: {new Date(expense.date).toLocaleDateString()}</div>
              <button onClick={() => handleDelete(expense._id)} className="delete-button">Delete</button>
            </li>
          ))
        ) : (
          <p>No expenses found</p>
        )}
      </ul>
    </div>
  );
};

export default ViewExpenses;






























































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {  useSelector } from 'react-redux';

// import { RootState } from '../stateManagement/reducers';

// interface Expense {
//   _id: string;
//   userId: string;
//   category: string;
//   amount: number;
//   description: string;
//   date: string;
// }

// const ViewExpenses: React.FC = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const  userId  = useSelector((state: RootState) => state.authReducer.authData.id );




// const handleDelete= async (userId: string) => {

//   try {
//     await axios.delete(
//       `http://localhost:5000/api/expenses/delete-expense/${userId}`, 
//  );
//     setExpenses(
//       expenses.filter((expense) => expense._id !== userId)
//     );
//   }catch(error){
//     console.error('Failed to delete category', error);
//   }
// };



//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
        
//         const response = await axios.get(`http://localhost:5000/api/expenses/get-expense/${userId}`);
//         setExpenses(response.data);
//         console.log("Response:", response.data);
//       } catch (error) {
//         alert('Error fetching expenses');
//         console.error('Error fetching expenses:', error);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   return (
//     <div>
//       <h2>Expenses</h2>
//       <ul>
//         {expenses.length > 0 ? (
//           expenses.map((expense) => (
//             <li key={expense._id}>
//               <div>Category: {expense.category}</div>
//               <div>Amount: {expense.amount}</div>
//               <div>Description: {expense.description}</div>
//               <div>Date: {new Date(expense.date).toLocaleDateString()}</div>
//               <button onClick={() => handleDelete(expense._id)}>Delete</button>
//             </li>
//           ))
//         ) : (
//           <p>No expenses found</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ViewExpenses;






