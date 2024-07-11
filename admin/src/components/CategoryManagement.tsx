import React, { useState, useEffect } from "react";
import axios from "axios";
import { RootState } from "../stateManagement/reducers";
import { useSelector } from "react-redux";
import "./Category.css";

interface ICategory {
  _id: string;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = useSelector((state: RootState) => state.adminReducer.token);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/get-categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const handleAddCategory = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/admin/add-categories", { name: newCategory }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories();
      setNewCategory("");
    } catch (error) {
      setError("Failed to add category");
    }
  };

  const handleUpdateCategory = async (categoryId: string) => {
    const newName = updateCategoryName[categoryId];
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/update-categories/${categoryId}`, { name: newName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.map((category) =>
        category._id === categoryId ? response.data : category
      ));
      setUpdateCategoryName({ ...updateCategoryName, [categoryId]: "" }); // Clear input field after update
    } catch (error) {
      setError("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((category) => category._id !== categoryId));
    } catch (error) {
      setError("Failed to delete category");
    }
  };

  const handleUpdateInputChange = (categoryId: string, newName: string) => {
    setUpdateCategoryName({ ...updateCategoryName, [categoryId]: newName });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="category-management-container">
      <h2>Category Management</h2>
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <input
              type="text"
              value={updateCategoryName[category._id] || ""}
              onChange={(e) => handleUpdateInputChange(category._id, e.target.value)}
              placeholder="New Name"
            />
            <button onClick={() => handleUpdateCategory(category._id)}>Update</button>
            <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;



















































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { RootState } from "../stateManagement/reducers";
// import { useSelector } from "react-redux";

// interface ICategory {
//   _id: string;
//   name: string;
// }

// const CategoryManagement: React.FC = () => {
//   const [categories, setCategories] = useState<ICategory[]>([]);
//   console.log("categories: ", categories);
//   const [newCategory, setNewCategory] = useState("");
//   const [updateCategoryName, setUpdateCategoryName] = useState<{ [key: string]: string }>({});
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const token = useSelector(
//     (state: RootState) => state.adminReducer.token
//   );
//   console.log("TOKEN>>>>>>>", token)
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/admin/get-categories",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCategories(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch categories");
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchCategories();
//   }, [token]);

//   const handleAddCategory = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/admin/add-categories",
//         { name: newCategory },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       fetchCategories();
//       setNewCategory("");
//     } catch (error) {
//       setError("Failed to add category");
//     }
//   };




//   const handleUpdateCategory = async (categoryId: string) => {
//     const newName = updateCategoryName[categoryId];
//     try {
//       const response = await axios.put(`http://localhost:5000/api/admin/update-categories/${categoryId}`, { name: newName }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCategories(categories.map((category) =>
//         category._id === categoryId ? response.data : category
//       ));
//       setUpdateCategoryName({ ...updateCategoryName, [categoryId]: "" }); // Clear input field after update
//     } catch (error) {
//       setError("Failed to update category");
//     }
//   };







//   const handleDeleteCategory = async (categoryId: string) => {
//     // console.log("categoryId: ", categoryId);
//     // console.log("iiiii");
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/admin/delete-categories/${categoryId}`,  {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCategories(
//         categories.filter((category) => category._id !== categoryId)
//       );
//     } catch (error) {
//       setError("Failed to delete category");
//     }
//   };
//   const handleUpdateInputChange = (categoryId: string, newName: string) => {
//     setUpdateCategoryName({ ...updateCategoryName, [categoryId]: newName });
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Category Management</h2>
//       <div>
//         <input
//           type="text"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//         />
//         <button onClick={handleAddCategory}>Add Category</button>
//       </div>
      
//       <ul>
//               {categories.map((category) => (
//           <li key={category._id}>
//             {category.name}
//             <input
//               type="text"
//               placeholder="New Name"
//               value={updateCategoryName[category._id] || ""}
//               onChange={(e) => handleUpdateInputChange(category._id, e.target.value)}
//             />
//             <button onClick={() => handleUpdateCategory(category._id)}>Update</button>
//             <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryManagement;


