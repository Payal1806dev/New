import { Request, Response } from "express";
// import adminService from "./adminService";
import { IUserLogin } from "../users/interface";
import adminService from "./adminService";
// import { getAllUsers, deleteUser, getAllUsersExpenses, addExpenseCategory, updateExpenseCategory, deleteExpenseCategory } from '../services/adminService';

export const loginUser = async (req: Request, res: Response) => {
  // console.log("hello");
  try {
    console.log(req.body, "ewdsfsdahjvfsdjhvj");
    const response = await adminService.login(req.body);
    console.log(response);
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(401).json(response);
    }
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const GetUser = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    console.log(users)
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};
export const getAllUsersCtrl = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteUserCtrl = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await adminService.deleteUser(userId);
    res.status(204).end();
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllUsersExpensesCtrl = async (req: Request, res: Response) => {
  try {
    const usersExpenses = await adminService.getAllUsersExpenses();
    res.status(200).json(usersExpenses);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addExpenseCategoryCtrl = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    console.log(name);
    const category = await adminService.addExpenseCategory(name);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateExpenseCategoryCtrl = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(req.body, ":::::::::::::", id);
  try {
    const category = await adminService.updateExpenseCategory(id, name);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteExpenseCategoryCtrl = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  console.log("------>>>", id);
  try {
    await adminService.deleteExpenseCategory(id);
    console.log(await adminService.deleteExpenseCategory(id))
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};
// export const deleteExpenseCategoryCtrl = async (req: Request, res:Response) => {
//   console.log("delete...........")
//   try {
//       const result = await adminService.deleteExpenseCategory(req.params.id)
//       res.status(201).json(result)
//   } catch (error) {
//       res.status(400).json(error)
//   }
// };

// export const deleteExpenseCategory = async (req: Request, res: Response) => {
//   const { categoryId } = req.params;
//   try {
//     const response = await adminService.deleteExpenseCategoryy(categoryId);
//     if (!response.success) {
//       return res.status(404).json({ message: response.message });
//     }
//     return res.status(200).json({ message: response.message });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const updateExpenseCategory = async (req: Request, res: Response) => {
//   const { categoryId } = req.params;
//   const { name } = req.body;
//   try {
//     const response = await adminService.updateExpenseCategoryy(categoryId, {
//       name,
//     });
//     if (!response.success) {
//       return res.status(404).json({ message: response.message });
//     }
//     return res.status(200).json({ message: response.message });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
