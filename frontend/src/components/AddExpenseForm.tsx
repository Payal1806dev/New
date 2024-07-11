import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../stateManagement/reducers';
import './AddExpense.css'; // Import your CSS file

interface ICategory {
  _id: string;
  name: string;
}

const AddExpense = () => {
  const userId = useSelector((state: RootState) => state.authReducer.authData.id);
  
  const [formData, setFormData] = useState({
    amount: '',
    categoryId: '',
    date: '',
    description: '',
    userId: userId,
  });

  const [category, setCategory] = useState<ICategory[]>([]);

  const getCategory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/get-categories');
      setCategory(res.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, userId: string) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const selectedCategory = category.find(cat => cat._id === value);
      if (selectedCategory) {
        setFormData(prevFormData => ({
          ...prevFormData,
          categoryId: selectedCategory._id,
          [name]: selectedCategory.name,
          userId: userId,
        }));
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
        userId: userId,
      }));
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/expenses/add-expense', formData);
      console.log(response.data);
      // Optionally, reset form fields or provide feedback to user
    } catch (error) {
      console.error('Failed to add expense', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" value={formData.amount} onChange={(e) => handleChange(e, userId)} placeholder="Amount" />
        <select name="category" value={formData.categoryId} onChange={(e) => handleChange(e, userId)} >
          <option value="">Select Category</option>
          {category.map((cat: ICategory) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input type="date" name="date" value={formData.date} onChange={(e) => handleChange(e, userId)} placeholder="Date" />
        <input type="text" name="description" value={formData.description} onChange={(e) => handleChange(e, userId)} placeholder="Description" />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;










































// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '../stateManagement/reducers';

// // interface ICategory {
// //   _id: string;
// //   name: string;
// // }

// // const AddExpense = () => {
// //   const userId = useSelector((state: RootState) => state.authReducer.authData.id);
  
// //   const [formData, setFormData] = useState({
// //     amount: '',
// //     categoryId: '',  // Change to store categoryId instead of category
// //     date: '',
// //     description: '',
// //     userId: userId,
// //   });

// //   const [category, setCategory] = useState<ICategory[]>([]);

// //   const getCategory = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:5000/api/admin/get-categories');
// //       setCategory(res.data.data);
      
// //     } catch (error) {
// //       console.error('Error fetching categories:', error);
// //     }
// //   };

// //   const handleChange = (e: any, userId: string) => {
// //     const { name, value } = e.target;

// //     if (name === 'category') {
// //       const selectedCategory = category.find(cat => cat._id === value);
// //       if (selectedCategory) {
// //         setFormData(prevFormData => ({
// //           ...prevFormData,
// //           categoryId: selectedCategory._id,  // Store categoryId
// //           [name]: selectedCategory.name,  // Optionally store category name if needed
// //           userId: userId,
// //         }));
// //       }
// //     } else {
// //       setFormData(prevFormData => ({
// //         ...prevFormData,
// //         [name]: value,
// //         userId: userId,
// //       }));
// //     }
// //   };

// //   useEffect(() => {
// //     getCategory();
// //   }, []);

// //   const handleSubmit = async (e: any) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/expenses/add-expense', formData);
// //       console.log(response.data);
// //     } catch (error) {
// //       console.error('Failed to add expense', error);
// //     }
// //   };

// //   return (
// //     <>
// //     <form onSubmit={handleSubmit}>
// //       <input type="number" name="amount" value={formData.amount} onChange={(e) => handleChange(e, userId)} placeholder="Amount" />
// //       <select name="category" value={formData.categoryId} onChange={(e) => handleChange(e, userId)} >
// //         <option value="">Select Category</option>
// //         {category.map((cat: ICategory) => (
// //           <option key={cat._id} value={cat._id}>{cat.name}</option>
// //         ))}
// //       </select>
// //       <input type="date" name="date" value={formData.date} onChange={(e) => handleChange(e, userId)} placeholder="Date" />
// //       <input type="text" name="description" value={formData.description} onChange={(e) => handleChange(e, userId)} placeholder="Description" />
// //       <button type="submit">Add Expense</button>
// //     </form>
// //     </>
// //   )
// // };

// // export default AddExpense;
















