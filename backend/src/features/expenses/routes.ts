import express from "express";

import {
  addExpenses,
  compareWeeklyExpenses,
  deleteExpenses,
  filterExpenses,
  getAllExpenses,
  MonthlyExpenses,
  TotalExpenses,
  WeeklyExpenses,
} from "./controller";


const expenseRouter = express.Router();

expenseRouter.post("/add-expense", addExpenses);

expenseRouter.get("/get-expense/:id", getAllExpenses);

expenseRouter.delete("/delete-expense/:id", deleteExpenses);

expenseRouter.get("/filter-expense/:userId", filterExpenses);

expenseRouter.get("/weekly-expense/:userId", WeeklyExpenses);

expenseRouter.get("/monthly-expense/:userId", MonthlyExpenses);

expenseRouter.get("/total-expense/:userId", TotalExpenses);

expenseRouter.get('/compare/:userId', compareWeeklyExpenses);

export default expenseRouter;
