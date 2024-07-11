
import express from "express";
import { Request, Response } from 'express';

import expenseService from "./services";
export const addExpenses = async (req: express.Request,
  res: express.Response)=> {
  try {
    const {userId, categoryId , category, amount, description, date} = req.body;
    
    const expense = await expenseService.addExpense({ userId, categoryId, category, amount, description, date });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllExpenses = async (req: express.Request, res: express.Response)=> {
  try {
    const { id } = req.params;
   
    const expenses = await expenseService.getAllExpenses(id);
  
    res.status(200).json(expenses);
    
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteExpenses = async (req: express.Request, res: express.Response)=> {
  try {
    const { id } = req.params;
    await expenseService.deleteExpense(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json(err);
  }
};





export const filterExpenses = async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const { category, startDate, endDate } = req.query;
    const expenses = await expenseService.filterExpenses(
      userId,
      category as string,
      startDate ? new Date(startDate as string) : new Date(),
      endDate ? new Date(endDate as string) : new Date()
    );
    res.status(200).json(expenses);
  } catch (err) {
    res.status(400).json(err);
  }
};


export const WeeklyExpenses = async (req: Request, res: Response)=> {
  
  try {
    const { userId } = req.params;
   
    const weeklyExpenses = await expenseService.getWeeklyExpenses(userId);

    res.status(200).json(weeklyExpenses);
    
  } catch (err) {
    res.status(400).json(err);
  }
};


export const MonthlyExpenses = async (req: Request, res: Response)=> {
  
  try {
    const { userId } = req.params;
   
    const monthlyExpenses = await expenseService.getMonthlyExpenses(userId);

    res.status(200).json(monthlyExpenses);
    
  } catch (err) {
    res.status(400).json(err);
  }
};



export const TotalExpenses = async (req: Request, res: Response)=> {
  
  try {
    const { userId } = req.params;
   
    const totalExpenses = await expenseService.getTotalExpenses(userId);
    
    res.status(200).json(totalExpenses);
    
  } catch (err) {
    res.status(400).json(err);
  }
};








export const compareWeeklyExpenses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { startDate1, startDate2 } = req.query;

    if (!startDate1 || !startDate2) {
      return res.status(400).json({ message: 'Both startDate1 and startDate2 are required' });
    }

    const comparison = await expenseService.compareWeeklyExpenses(
      userId,
      new Date(startDate1 as string),
      new Date(startDate2 as string)
    );

    res.status(200).json(comparison);
  } catch (err) {
    res.status(400).json(err);
  }
};