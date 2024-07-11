import mongoose from "mongoose";
const Schema = mongoose.Schema;

const expenseCategorySchema= new Schema({
    name: { type: String, required: true, unique: true }
  });


export const ExpenseCategory = mongoose.model("ExpenseCategory",expenseCategorySchema);
  