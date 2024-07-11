// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { RootState } from '../stateManagement/reducers';
// import { useSelector } from 'react-redux';
// // import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
// import './UsersManagement.css';
// import { useNavigate } from 'react-router-dom';
// import routes from '../constants/routes';
// import { Link } from "react-router-dom";

// interface User {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
// }

// const UsersManagement: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const navigate= useNavigate()

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/get-users', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Fetch users error:', error);
//         setError('Failed to fetch users');
//       }
//     };

//     fetchUsers();
//   }, []);

//   const token = useSelector((state: RootState) => state.adminReducer.token);

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/delete-users/${userId}`);
//       setUsers(users.filter((user) => user._id !== userId));
//     } catch (error) {
//       console.error('Delete user error:', error);
//       setError('Failed to delete user');
//     }
//   };

//   const viewExpenses = (userId: string) => {
//     navigate(routes.VIEW_EXPENSES)
//     // <Link to={routes.VIEW_EXPENSES}></Link>
//   };

//   return (
//     <div className="users-management-container">
//       <h2>Users Management</h2>
//       {error && <p>{error}</p>}
//       <ul>
//         {users.length > 0 ? (
//           users.map((user) => (
//             <li key={user._id}>
//               <div className="user-details">
//                 <div className="name">{user.first_name} {user.last_name}</div>
//                 <div className="email">{user.email}</div>
//               </div>
//               <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
//               <button onClick={() => viewExpenses(user._id)}>View Expenses</button>
//             </li>
//           ))
//         ) : (
//           <p>No users found</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default UsersManagement;


































































































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RootState } from '../stateManagement/reducers';
import { useSelector } from 'react-redux';
import './UsersManagement.css';

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}
interface Expense {
  _id: string;
  userId: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Track the selected user ID
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/get-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Fetch users error:', error);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const token = useSelector((state: RootState) => state.adminReducer.token);

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Delete user error:', error);
      setError('Failed to delete user');
    }
  };

  const viewExpenses = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses/get-expense/${userId}`);
      setExpenses(response.data);
      setSelectedUserId(userId); // Set selected user ID to show expenses
    } catch (error) {
      console.error('Failed to view expenses', error);
    }
  };

  return (
    <div className="users-management-container">
      <h2>Users Management</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              <div className="user-details">
                <div className="name">{user.first_name} {user.last_name}</div>
                <div className="email">{user.email}</div>
              </div>
              <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
              <button onClick={() => viewExpenses(user._id)}>View Expenses</button>
              {selectedUserId === user._id && (
                <ul>
                  {expenses.map((expense) => (
                    <li key={expense._id}>
                      <div>
                        <div>Category: {expense.category}</div>
                        <div>Amount: {expense.amount}</div>
                        <div>Description: {expense.description}</div>
                        <div>Date: {expense.date}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
};

export default UsersManagement;







































// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { RootState } from '../stateManagement/reducers';
// // import { useSelector } from 'react-redux';
// // import './UsersManagement.css';

// // interface User {
// //   _id: string;
// //   first_name: string;
// //   last_name: string;
// //   email: string;
// // }
// // interface Expense {
// //   _id: string;
// //   userId: string;
// //   category: string;
// //   amount: number;
// //   description: string;
// //   date: string;
// // }

// // const UsersManagement: React.FC = () => {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [error, setError] = useState<string | null>(null);
// //   const [expenses, setExpenses] = useState<Expense[]>([]);
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/admin/get-users', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setUsers(response.data);
// //       } catch (error) {
// //         console.error('Fetch users error:', error);
// //         setError('Failed to fetch users');
// //       }
// //     };

// //     fetchUsers();
// //   }, []);

// //   const token = useSelector((state: RootState) => state.adminReducer.token);

// //   const handleDeleteUser = async (userId: string) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/admin/delete-users/${userId}`);
// //       setUsers(users.filter((user) => user._id !== userId));
// //     } catch (error) {
// //       console.error('Delete user error:', error);
// //       setError('Failed to delete user');
// //     }
// //   };

// //   const viewExpenses=async(userId:string)=>{
// //     try{
// //         const response= await axios.get(`http://localhost:5000/api/expenses/get-expense/${userId}`);
// //          setExpenses(response.data);
// //     }
// //     catch(error){
// //       console.error('Failed to view expenses',error);
// //     }
// //     return expenses
// //   }
















// //   return (
// //     <div className="users-management-container">
// //       <h2>Users Management</h2>
// //       {error && <p>{error}</p>}
// //       <ul>
// //         {users.length > 0 ? (
// //           users.map((user) => (
// //             <li key={user._id}>
// //               <div className="user-details">
// //                 <div className="name">{user.first_name} {user.last_name}</div>
// //                 <div className="email">{user.email}</div>
// //               </div>
// //               <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
// //               <button onClick={() => viewExpenses(user._id)}>View User</button>
// //             </li>
// //           ))
// //         ) : (
// //           <p>No users found</p>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default UsersManagement;











