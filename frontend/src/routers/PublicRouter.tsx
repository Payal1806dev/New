import React from 'react'
import { Route, Routes } from "react-router-dom";
import routes from '../constatnts/routes';
import { PrivateRouter } from './PrivateRouter';
import { Home } from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import AddExpense from '../components/AddExpenseForm';
import ViewExpenses from '../components/ViewExpenses';
// import ExpenseList from '../components/Expense';
import Expenses from '../components/ExpenseList';
// import WeeklyExpenses from '../components/expenses/WeeklyExpenses';
import Dashboard from '../components/expenses/Dashboard';
// import { ViewExpenses } from '../components/ViewExpenses';
// import { AddExpense } from '../components/AddExpenseForm';
// import AddExpense from '../components/AddExpenseForm';
// import ViewExpenses from '../components/ViewExpenses';


export const PublicRouter = () => {
  return (
    <>
    <Routes>
    
    <Route
          path={routes.LOGIN}
          element={<PrivateRouter component={Login} route={routes.LOGIN} />}
        />
       
        <Route
            path={routes.SIGNUP}
            element={<PrivateRouter component={SignUp} route={routes.SIGNUP}/>}
            />
            
        <Route
            path={routes.ADDEXPENSES}
            element={<PrivateRouter component={AddExpense} route={routes.ADDEXPENSES}/>}
            />
        <Route
            path={routes.VIEW_EXPENSES}
            element={<PrivateRouter component={ViewExpenses} route={routes.VIEW_EXPENSES}/>}
            />
             <Route
            path={routes.EXPENSE_LIST}
            element={<PrivateRouter component={Expenses} route={routes.EXPENSE_LIST}/>}
            />
            <Route
            path={routes.DASHBOARD}
            element={<PrivateRouter component={Dashboard} route={routes.DASHBOARD}/>}
            />
     
    </Routes>
    </>
  )
}