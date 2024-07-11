import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../stateManagement/reducers";
import './Dashboard.css'; // Import the CSS file

interface WeeklyExpense {
  _id: { category: string };
  total: number;
}

interface MonthlyExpense {
  _id: { category: string };
  total: number;
}

interface ExpenseComparison {
  category: string;
  week1: number;
  week2: number;
  difference: number;
}

const Dashboard: React.FC = () => {
  const [weeklyExpenses, setWeeklyExpenses] = useState<WeeklyExpense[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [comparisonData, setComparisonData] = useState<ExpenseComparison[]>([]);
  const first_name=useSelector((state:RootState)=>state.authReducer.authData.first_name)
  console.log("DASHBoard....", first_name)
  const userId = useSelector(
    (state: RootState) => state.authReducer.authData.id
  );

  useEffect(() => {
    const fetchWeeklyExpenses = async () => {
      try {
        const response = await axios.get<WeeklyExpense[]>(
          `http://localhost:5000/api/expenses/weekly-expense/${userId}`
        );
        setWeeklyExpenses(response.data);
      } catch (error) {
        console.error("Error fetching weekly expenses:", error);
      }
    };

    fetchWeeklyExpenses();
  }, [userId]);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const response = await axios.get<WeeklyExpense[]>(
          `http://localhost:5000/api/expenses/monthly-expense/${userId}`
        );

        setMonthlyExpenses(response.data);
        console.log("Monthly Expenses:", response.data);
      } catch (error) {
        console.error("Error fetching monthly expenses:", error);
      }
    };

    fetchMonthlyExpenses();
  }, [userId]);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        const response = await axios.get<number>(
          `http://localhost:5000/api/expenses/total-expense/${userId}`
        );

        setTotalExpenses(response.data);
        console.log("Total Expenses:", response.data);
      } catch (error) {
        console.error("Error fetching total expenses:", error);
      }
    };

    fetchTotalExpenses();
  }, [userId]);

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const response = await axios.get<ExpenseComparison[]>(
          `http://localhost:5000/api/expenses/compare/${userId}?startDate1=2024-06-24&startDate2=2024-07-01`
        );

        setComparisonData(response.data);
        console.log("Comparison Data:", response.data);
      } catch (error) {
        console.error("Error fetching comparison data:", error);
      }
    };

    fetchComparisonData();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <div className="section box">
        <h1>WELCOME {first_name}</h1>
        <h2>Weekly Expenses</h2>
        <ul>
          {weeklyExpenses.map((expense, index) => (
            <li key={index}>
              {expense._id.category}: ${expense.total}
            </li>
          ))}
        </ul>
      </div>

      <div className="section box">
        <h2>Monthly Expenses</h2>
        <ul>
          {monthlyExpenses.map((expense, index) => (
            <li key={index}>
              {expense._id.category}: ${expense.total}
            </li>
          ))}
        </ul>
      </div>
      <div className="section box">
        <h2>Total Expenses</h2>
        <p>Total Expenses: ${totalExpenses}</p>
      </div>

      <div className="section box">
        <h2>Weekly Expense Comparison</h2>
        <ul>
          {comparisonData.map((comparison, index) => (
            <li key={index}>
              {comparison.category}: Week 1: ${comparison.week1}, Week 2: ${comparison.week2}, Difference: ${comparison.difference}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;






































































































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "../../stateManagement/reducers";

// interface WeeklyExpense {
//   _id: { category: string };
//   total: number;
// }

// interface MonthlyExpense {
//   _id: { category: string };
//   total: number;
// }

// interface ExpenseComparison {
//   category: string;
//   week1: number;
//   week2: number;
//   difference: number;
// }

// const Dashboard: React.FC = () => {
//   const [weeklyExpenses, setWeeklyExpenses] = useState<WeeklyExpense[]>([]);
//   const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);
//   const [totalExpenses, setTotalExpenses] = useState<number>(0);
//   const [comparisonData, setComparisonData] = useState<ExpenseComparison[]>([]);

//   const userId = useSelector(
//     (state: RootState) => state.authReducer.authData.id
//   );

//   useEffect(() => {
//     const fetchWeeklyExpenses = async () => {
//       try {
//         const response = await axios.get<WeeklyExpense[]>(
//           `http://localhost:5000/api/expenses/weekly-expense/${userId}`
//         );
//         setWeeklyExpenses(response.data);
//       } catch (error) {
//         console.error("Error fetching weekly expenses:", error);
//       }
//     };

//     fetchWeeklyExpenses();
//   }, [userId]);

//   useEffect(() => {
//     const fetchMonthlyExpenses = async () => {
//       try {
//         const response = await axios.get<WeeklyExpense[]>(
//           `http://localhost:5000/api/expenses/monthly-expense/${userId}`
//         );

//         setMonthlyExpenses(response.data);
//         console.log("Monthly Expenses:", response.data);
//       } catch (error) {
//         console.error("Error fetching monthly expenses:", error);
//       }
//     };

//     fetchMonthlyExpenses();
//   }, [userId]);

//   useEffect(() => {
//     const fetchTotalExpenses = async () => {
//       try {
//         const response = await axios.get<number>(
//           `http://localhost:5000/api/expenses/total-expense/${userId}`
//         );

//         setTotalExpenses(response.data);
//         console.log("Total Expenses:", response.data);
//       } catch (error) {
//         console.error("Error fetching total expenses:", error);
//       }
//     };

//     fetchTotalExpenses();
//   }, [userId]);

//   useEffect(() => {
//     const fetchComparisonData = async () => {
//       try {
//         const response = await axios.get<ExpenseComparison[]>(
//           `http://localhost:5000/api/expenses/compare/${userId}?startDate1=2024-06-24&startDate2=2024-07-01`
//         );

//         setComparisonData(response.data);
//         console.log("Comparison Data:", response.data);
//       } catch (error) {
//         console.error("Error fetching comparison data:", error);
//       }
//     };

//     fetchComparisonData();
//   }, [userId]);

//   return (
//     <>
//       <div>
//         <h2>Weekly Expenses</h2>
//         <ul>
//           {weeklyExpenses.map((expense, index) => (
//             <li key={index}>
//               {expense._id.category}: ${expense.total}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Monthly Expenses</h2>
//         <ul>
//           {monthlyExpenses.map((expense, index) => (
//             <li key={index}>
//               {expense._id.category}: ${expense.total}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Total Expenses</h2>
//         <p>Total Expenses: ${totalExpenses}</p>
//       </div>

//       <div>
//         <h2>Weekly Expense Comparison</h2>
//         <ul>
//           {comparisonData.map((comparison, index) => (
//             <li key={index}>
//               {comparison.category}: Week 1: ${comparison.week1}, Week 2: ${comparison.week2}, Difference: ${comparison.difference}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
