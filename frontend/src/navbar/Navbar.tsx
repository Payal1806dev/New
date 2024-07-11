import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState } from "../stateManagement/reducers";
import routes from "../constatnts/routes";
import { LogoutAction } from "../stateManagement/actions/authAction";
import "./Navbar.css"; // Import your CSS file

const Navbar = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <nav>
        {isLoggedIn ? (
          <>
            <Link to={routes.DASHBOARD} className="sidebar-link">Dashboard</Link>
            <Link to={routes.ADDEXPENSES} className="sidebar-link">Add Expenses</Link>
            <Link to={routes.VIEW_EXPENSES} className="sidebar-link">View Expenses</Link>
            <Link to={routes.EXPENSE_LIST} className="sidebar-link">Expenses List</Link>
            <Link
              to={routes.LOGIN}
              className="sidebar-link"
              onClick={() => {
                dispatch(LogoutAction());
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to={routes.LOGIN} className="sidebar-link">Login</Link>
            <Link to={routes.SIGNUP} className="sidebar-link">SignUp</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;










































// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { RootState } from "../stateManagement/reducers";
// import routes from "../constatnts/routes";
// import { LogoutAction } from "../stateManagement/actions/authAction";
// // import routes from "../constants/routes";
// // import { LogoutAction } from "../stateManagement/actions/adminAction";

// const Navbar = () => {
//   const { isLoggedIn } = useSelector((state: RootState) => state.authReducer);
//  console.log("<LOGEDIN>",routes.LOGIN)
//   const dispatch = useDispatch();
// console.log("YYYY---->>",routes.ADDEXPENSES)
//   return (
//     <nav>
      
//       {isLoggedIn ? (

//         <>
//         <Link to={routes.DASHBOARD}>Dashboard</Link>

//           <Link to={routes.ADDEXPENSES}>Add Expenses</Link>
          
//           <Link to={routes.VIEW_EXPENSES}>View Expenses</Link>
         
//           <Link to={routes.EXPENSE_LIST}>Expenses List</Link>

          
//           <Link
//             to={routes.LOGIN}
//             onClick={() => {
//               dispatch(LogoutAction());
//             }}
//           >
//             Logout
//           </Link>
//         </>
//       ) : (
//         <>
//         <Link to={routes.LOGIN}>Login</Link>
//         <Link to={routes.SIGNUP}>SignUp</Link>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;