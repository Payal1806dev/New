import express from "express";

import { isAdmin } from "../../middlewares/adminMiddleware";
import { addExpenseCategoryCtrl, deleteExpenseCategoryCtrl, deleteUserCtrl, getAllUsersCtrl, getAllUsersExpensesCtrl, loginUser, updateExpenseCategoryCtrl } from './adminController';
// import { authenticate } from "../../middlewares/authMiddleware";
import { GetUser } from "./adminController";
import { verifyToken } from "../../middlewares/authMiddleware";
// import { authenticate } from "../../middlewares/authMiddleware";

const adminRouter = express.Router();

adminRouter.get('/users' , verifyToken, getAllUsersCtrl);

adminRouter.post("/admin-login", loginUser);
adminRouter.get("/get-users",GetUser);
adminRouter.delete('/delete-users/:id', deleteUserCtrl);

adminRouter.get('/get-categories' , getAllUsersExpensesCtrl);

adminRouter.post('/add-categories' ,verifyToken, addExpenseCategoryCtrl);

adminRouter.put('/update-categories/:id' , verifyToken,  updateExpenseCategoryCtrl);

adminRouter.delete('/delete-categories/:id',  deleteExpenseCategoryCtrl);

export default adminRouter;
