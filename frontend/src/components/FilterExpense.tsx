import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stateManagement/reducers';
import './FilterExpenses.css'; // Import your CSS file

interface Expense {
  _id: string;
  userId: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

const FilterExpenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });
  const userId = useSelector((state: RootState) => state.authReducer.authData.id);

  const handleDelete = async (expenseId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/delete-expense/${expenseId}`);
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error('Failed to delete expense', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchFilteredExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/expenses/filter-expense/${userId}`, {
        params: filters,
      });
      setExpenses(response.data);
      console.log("Response:", response.data);
    } catch (error) {
      alert('Error fetching filtered expenses');
      console.error('Error fetching filtered expenses:', error);
    }
  };

  useEffect(() => {
    fetchFilteredExpenses();
  }, [filters]);

  return (
    <div className="filter-expenses-container">
      <h2>Filter Expenses</h2>
      <form onSubmit={(e) => { e.preventDefault(); fetchFilteredExpenses(); }}>
        <div className="form-group">
          <label>Category</label>
          <input name="category" value={filters.category} onChange={handleFilterChange} />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
        </div>
        <button type="submit" className="filter-button">Filter</button>
      </form>
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

export default FilterExpenses;













































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

// const FilterExpenses: React.FC = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [filters, setFilters] = useState({ category: '', startDate: '', endDate: '' });
//   const userId = useSelector((state: RootState) => state.authReducer.authData.id);

//   console.log("userId:", userId);

//   const handleDelete = async (expenseId: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/expenses/filter-expenses/${expenseId}`);
//       setExpenses(expenses.filter((expense) => expense._id !== expenseId));
//     } catch (error) {
//       console.error('Failed to delete expense', error);
//     }
//   };

//   const handleFilterChange = (e:any) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const fetchFilteredExpenses = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/expenses/filter/${userId}`, {
//         params: filters,
//       });
//       setExpenses(response.data);
//       console.log("Response:", response.data);
//     } catch (error) {
//       alert('Error fetching filtered expenses');
//       console.error('Error fetching filtered expenses:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFilteredExpenses();
//   }, [filters]);

//   return (
//     <div>
//       <h2>Filter Expenses</h2>
//       <form onSubmit={(e) => { e.preventDefault(); fetchFilteredExpenses(); }}>
//         <div>
//           <label>Category</label>
//           <input name="category" value={filters.category} onChange={handleFilterChange} />
//         </div>
//         <div>
//           <label>Start Date</label>
//           <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
//         </div>
//         <div>
//           <label>End Date</label>
//           <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
//         </div>
//         <button type="submit">Filter</button>
//       </form>
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

// export default FilterExpenses;
