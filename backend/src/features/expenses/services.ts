import { IExpense } from "./interface";
import { Expense } from "./expenseModel";
import mongoose from "mongoose";
class expenseService {
  async addExpense(expenseData: IExpense) {
    try {
      const expense = new Expense(expenseData);
      await expense.save();
      return expense;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllExpenses(userId: string) {
    
    try {
      const expenses = await Expense.find({ userId: userId });
      console.log("EXP>>>>", expenses);
      if (!expenses) {
        throw new Error("Category not found");
      } else {
        return expenses;
      }
      console.log("EXPENSESSSS>......", expenses);
      return expenses;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteExpense(userId: string) {
    try {
      await Expense.findByIdAndDelete(userId);
    } catch (err) {
      console.log(err);
    }
  }


 async filterExpenses(userId:string, category:string, startDate:Date, endDate:Date) {
 
    try {
      const query:any = { userId};

      if (category) {
        query.category = category;
      }

      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
      }

      return await Expense.find(query);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to filter expenses');
    }
  }




  async getWeeklyExpenses (userId:string) {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); 

  const weeklyExpenses = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfWeek, $lte: endOfWeek }
      }
    },
    {
      $group: {
        _id: { category: "$category" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  return weeklyExpenses;
};






async getMonthlyExpenses(userId: string) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  const monthlyExpenses = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfMonth, $lte: endOfMonth }
      }
    },
    {
      $group: {
        _id: { category: "$category" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  return monthlyExpenses;
}

async getTotalExpenses(userId: string) {
  const total = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ]);

 
  return total[0]  ? total[0].total : 0;
}


async compareWeeklyExpenses(userId: string, startDate1: Date, startDate2: Date) {
  const getWeekRange = (startDate: Date) => {
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
  };

  const { startOfWeek: startOfWeek1, endOfWeek: endOfWeek1 } = getWeekRange(startDate1);
  const { startOfWeek: startOfWeek2, endOfWeek: endOfWeek2 } = getWeekRange(startDate2);

  const weeklyExpenses1 = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfWeek1, $lte: endOfWeek1 }
      }
    },
    {
      $group: {
        _id: { category: "$category" },
        total: { $sum: "$amount" }
      }
    }
  ]);

  const weeklyExpenses2 = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startOfWeek2, $lte: endOfWeek2 }
      }
    },
    {
      $group: {
        _id: { category: "$category" },
        total: { $sum: "$amount" }
      }
    }
  ]);

 
  const expensesMap1 = new Map();
  weeklyExpenses1.forEach(expense => {
    expensesMap1.set(expense._id.category, expense.total);
  });

  const expensesComparison = weeklyExpenses2.map(expense => {
    const category = expense._id.category;
    const total1 = expensesMap1.get(category) || 0;
    const total2 = expense.total;

    return {
      category,
      week1: total1,
      week2: total2,
      difference: total2 - total1
    };
  });

  return expensesComparison;
}












}
export default new expenseService();
