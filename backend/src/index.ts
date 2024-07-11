import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db/dbConnect';
import router from './features/users/routes';
import expenseRouter from './features/expenses/routes';
import adminRouter from './features/admin/adminRoute';


const app = express();
connectDB()

app.use(cors(
    {
      origin: ['http://localhost:3000','http://localhost:3001'],
      credentials: true,
    }
  
));
app.use(bodyParser.json());

app.use('/api/auth', router);
app.use('/api/expenses', expenseRouter);
app.use('/api/admin', adminRouter);
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
