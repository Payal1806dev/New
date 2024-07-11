export interface IExpense {
  _id: string;
  userId: string;
  category: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
}
