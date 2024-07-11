import { ExpenseCategory } from "../expenses/expenseCategoryModel";
import { Expense } from "../expenses/expenseModel";
import { IUserLogin } from "../users/interface";
import { UserModel } from "../users/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import envConfig from "../../config/envConfig";
import mongoose from "mongoose";
const response = {
  success: false,
  message: "",
  data: {},
};
class adminService {
  // async login(userData: IUserLogin) {
  //   console.log("IIIIII");
  //   const { email, password, isAdmin } = userData;
  //   console.log("password: ", password);
  //   // console.log(email)
  //   console.log(userData);
  //   const user = await UserModel.findOne({ email, isAdmin });
  //   if (user) {
  //     const validPassword = await bcrypt.compare(password, user.password);
  //     if (validPassword) {
  //       if (user.isAdmin===isAdmin) {
  //         const env = envConfig();
  //         const secretKey = env.secretKey;

  //         const token = jwt.sign(
  //           { userEmail: user.email, isAdmin: true },
  //           secretKey,
  //           { expiresIn: "1h" }
  //         );

  //         response.success = true;
  //         response.message = "Admin logged in successfully";
  //         response.data = {
  //           token,
  //           id: user._id,
  //           first_name: user.first_name,
  //           last_name: user.last_name,
  //           email: user.email,
  //           isAdmin: true,
  //         };
  //       } else {
  //         response.message = "Access denied. Admins only.";
  //       }
  //     } else {
  //       response.message = "Invalid password";
  //     }
  //   } else {
  //     response.message = "User not found";
  //   }

  //   return response;
  // }

  async login(userData: IUserLogin) {
    console.log("IIIIII");

    const { email, password, isAdmin } = userData;

    // console.log("password: ", password);

    // console.log(userData);

    const user = await UserModel.findOne({ email });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        if (user.isAdmin === isAdmin) {
          const env = envConfig();

          const secretKey = env.secretKey;
         console.log(user.role)
          const token = jwt.sign(
            { userEmail: user.email, userRole:user.role , userId: user._id },

            secretKey,

            { expiresIn: "1h" }
          );

          response.success = true;

          response.message = isAdmin
            ? "Admin logged in successfully"
            : "User logged in successfully";

          response.data = {
            token,

            id: user._id,

            first_name: user.first_name,

            last_name: user.last_name,

            email: user.email,

            isAdmin: user.isAdmin,

            isLoggedIn: true,

            userRole: user.role
          };
        } else {
          response.message = isAdmin
            ? "Access denied. Admins only."
            : "Access denied. Users only.";
        }
      } else {
        response.message = "Invalid password";
      }
    } else {
      response.message = "User not found";
    }

    return response;
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find().select("-password");
      console.log(users)
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(userId: string) {
    try {
      await UserModel.findByIdAndDelete(userId);
      await Expense.deleteMany({ userId });
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUsersExpenses() {
    try {
      const usersExpenses = await ExpenseCategory.find({}, { name: 1 });
      response.success = true;
      response.message = "Category found successfully";
      response.data = usersExpenses;
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addExpenseCategory(categoryName: string) {
    try {
      const existingCategory = await ExpenseCategory.findOne({
        name: categoryName,
      });
      if (existingCategory) {
        response.success = false;
        response.message = "Category already exists";
        return response;
      }
      const newCategory = new ExpenseCategory({ name: categoryName });
      const dataSaved = await newCategory.save();
      response.success = true;
      response.message = "Category added successfully";
      response.data = dataSaved;
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async updateExpenseCategory(categoryId: string, categoryName: string) {
    try {
      const category = await ExpenseCategory.findByIdAndUpdate({_id:categoryId}, {
        name: categoryName,
      });
      // console.log(">>>>>>>>>>>>>>>>>>", category);

      if (!category) {
        throw new Error("Category not found");
      } else {
        return category;
      }

      // category.name = categoryName;
      // await category.save();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteExpenseCategory(id: string) {
    console.log(">>>>>>>>>>>>>>DELETECTR")
    try {
      await ExpenseCategory.findByIdAndDelete(id);
      await Expense.deleteMany({ id });
    } catch (err) {
      console.log(err);
    }
  }

  // async deleteCategory(id: string) {

  //   console.log("delete")
  //   const response = { success: false, message: '', data: null };

  //   try {
  //     const categoryId = new mongoose.Types.ObjectId(id);
  //     const category = await ExpenseCategory.findByIdAndDelete(categoryId);

  //     if (category) {
  //       response.success = true;
  //       response.message = "Category deleted successfully";
  //       response.data = null;
  //     } else {
  //       response.message = "Category not found";
  //       response.success = false;
  //       response.data = null;
  //     }
  //   } catch (error) {
  //     console.error("Error deleting category:", error);
  //     response.message = "Failed to delete category";
  //   }

  //   return response;
  // }

  // async deleteExpenseCategory(categoryId: string) {
  //   const response = { success: false, message: '', data: null };

  //   try {
  //     const existingCategory = await ExpenseCategory.findById(categoryId);
  //     if (!existingCategory) {
  //       response.message = "Category does not exist";
  //       return response;
  //     }

  //     await ExpenseCategory.deleteOne({ _id: categoryId });
  //     response.success = true;
  //     response.message = "Category deleted successfully";
  //     return response;
  //   } catch (err) {
  //     console.error("Error deleting category:", err);
  //     response.message = "Failed to delete category";
  //     return response;
  //   }
  // }

  async deleteExpenseCategoryy(categoryId: string) {
    const response = {
      success: false,
      message: "",
      data: null,
    };

    try {
      const existingCategory = await ExpenseCategory.findById(categoryId);
      if (!existingCategory) {
        response.message = "Category does not exist";
        return response;
      }

      await ExpenseCategory.deleteOne({ _id: categoryId });
      response.success = true;
      response.message = "Category deleted successfully";
      return response;
    } catch (err) {
      response.message = "Failed to delete category";
      return response;
    }
  }
  async updateExpenseCategoryy(categoryId: string, data: { name: string }) {
    const response = {
      success: false,
      message: "",
      data: {},
    };

    try {
      const category = await ExpenseCategory.findByIdAndUpdate(
        categoryId,
        { name: data.name },
        { new: true }
      );
      if (!category) {
        response.message = "Category not found";
        return response;
      }

      response.success = true;
      response.message = "Category updated successfully";
      response.data = category;
      return response;
    } catch (error) {
      response.message = "Failed to update category";
      return response;
    }
  }
}
export default new adminService();

// export const login=async(userData: IUserLogin)=> {
//   const { email, password } = userData;
//   const user = await UserModel.findOne({ email });
//   if (user) {
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (validPassword) {

//       const env = envConfig();
//       const secretKey = env.secretKey;

//       const token = jwt.sign(
//         { userEmail: user.email },
//         secretKey,
//         { expiresIn: "1h" }
//       );

//       response.success = true;
//       response.message = "User logged in successfully";
//       response.data = {
//         token,

//           id: user._id,
//           first_name: user.first_name,
//           last_name: user.last_name,
//           email: user.email,

//       };
//     } else {
//       response.message = "Invalid password";
//     }
//   } else {
//     response.message = "User not found";
//   }
//   return response;
// }
