import mongoose from "mongoose";

export interface IExpense {
    userId: mongoose.Types.ObjectId;
    category: string;
    categoryId: mongoose.Types.ObjectId;
    amount: number;
    description: string;
    date: Date;
  }
  export interface IExpenseCategory  {
    name: string;
  }