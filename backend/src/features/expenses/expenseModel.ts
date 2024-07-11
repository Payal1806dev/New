import mongoose from "mongoose";
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  category: String,
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now },
  categoryId: { type: Schema.Types.ObjectId, ref: 'ExpenseCategory'},
  
});


export const Expense = mongoose.model("Expense", expenseSchema);
  