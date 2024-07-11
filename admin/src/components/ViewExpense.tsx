import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Expense {
  _id: string;
  userId: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

const ViewExpenses: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log("<<>>>----USERID", userId);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/expenses/get-expense/${userId}`);
        setExpenses(response.data);
      } catch (error) {
        console.error('Fetch expenses error:', error);
        setError('Failed to fetch expenses');
      }
    };

    fetchExpenses();
  }, [userId]);
 console.log("???VIEW", userId)
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
// import { useSelector } from 'react-redux';
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
//   const [error, setError] = useState<string | null>(null);
//   const userId = 'user-id-placeholder'; // Replace with actual user ID
//   const token = useSelector(
//     (state: RootState) => state.adminReducer.token
//   );
  
//   console.log("------>>>>>>",token)
//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/expenses/get-expense/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setExpenses(response.data);
//       } catch (error) {
//         console.error('Fetch expenses error:', error);
//         setError('Failed to fetch expenses');
//       }
//     };

//     fetchExpenses();
//   }, [userId]);

  // return (
  //   <div>
  //     <h2>View Expenses</h2>
  //     {error && <p>{error}</p>}
  //     <ul>
  //       {expenses.length > 0 ? (
  //         <>
  //           <li key={expenses[0]._id}>
  //             <div>Category: {expenses[0].category}</div>
  //             <div>Amount: ${expenses[0].amount}</div>
  //             <div>Description: {expenses[0].description}</div>
  //             <div>Date: {new Date(expenses[0].date).toLocaleDateString()}</div>
  //           </li>
  //           {expenses.length > 1 && (
  //             <li key={expenses[1]._id}>
  //               <div>Category: {expenses[1].category}</div>
  //               <div>Amount: ${expenses[1].amount}</div>
  //               <div>Description: {expenses[1].description}</div>
  //               <div>Date: {new Date(expenses[1].date).toLocaleDateString()}</div>
  //             </li>
  //           )}
  //           {expenses.length > 2 && (
  //             <li key={expenses[2]._id}>
  //               <div>Category: {expenses[2].category}</div>
  //               <div>Amount: ${expenses[2].amount}</div>
  //               <div>Description: {expenses[2].description}</div>
  //               <div>Date: {new Date(expenses[2].date).toLocaleDateString()}</div>
  //             </li>
  //           )}
           
  //         </>
  //       ) : (
  //         <p>No expenses found</p>
  //       )}
  //     </ul>
  //   </div>
  // );
// };

// export default ViewExpenses;

























// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {  useSelector } from 'react-redux';

// // import { RootState } from '../stateManagement/reducers';

// // interface Expense {
// //   _id: string;
// //   userId: string;
// //   category: string;
// //   amount: number;
// //   description: string;
// //   date: string;
// // }

// // const ViewExpenses: React.FC = () => {
// //   const [expenses, setExpenses] = useState<Expense[]>([]);
// //   const  userId  = useSelector((state: RootState) => state.authReducer.authData.id );




// // const handleDelete= async (userId: string) => {

// //   try {
// //     await axios.delete(
// //       `http://localhost:5000/api/expenses/delete-expense/${userId}`, 
// //  );
// //     setExpenses(
// //       expenses.filter((expense) => expense._id !== userId)
// //     );
// //   }catch(error){
// //     console.error('Failed to delete category', error);
// //   }
// // };



// //   useEffect(() => {
// //     const fetchExpenses = async () => {
// //       try {
        
// //         const response = await axios.get(`http://localhost:5000/api/expenses/get-expense/${userId}`);
// //         setExpenses(response.data);
// //         console.log("Response:", response.data);
// //       } catch (error) {
// //         alert('Error fetching expenses');
// //         console.error('Error fetching expenses:', error);
// //       }
// //     };

// //     fetchExpenses();
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Expenses</h2>
// //       <ul>
// //         {expenses.length > 0 ? (
// //           expenses.map((expense) => (
// //             <li key={expense._id}>
// //               <div>Category: {expense.category}</div>
// //               <div>Amount: {expense.amount}</div>
// //               <div>Description: {expense.description}</div>
// //               <div>Date: {new Date(expense.date).toLocaleDateString()}</div>
// //               <button onClick={() => handleDelete(expense._id)}>Delete</button>
// //             </li>
// //           ))
// //         ) : (
// //           <p>No expenses found</p>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default ViewExpenses;







