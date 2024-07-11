const routes = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADDEXPENSES:"/add-expense",
  VIEW_EXPENSES:"/view-expenses",
  EXPENSE_LIST:"/expenses",
  DASHBOARD:"/dashboard"
};
export const BeforeLoginRoutes = [
  routes.LOGIN,
  routes.SIGNUP,
];

export default routes;
