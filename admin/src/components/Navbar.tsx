import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState } from "../stateManagement/reducers";
import routes from "../constants/routes";
import { LogoutAction } from "../stateManagement/actions/adminAction";
import "./Navbar.css"; // Import the CSS file for Navbar styling

const Navbar = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.adminReducer);
  const dispatch = useDispatch();

  return (
    <nav className="sidebar">
      <Link to={routes.HOME}>Home</Link>
      {isLoggedIn ? (
        <>
          <Link to={routes.CATEGORY_MANAGEMENT}>Category Management</Link>
          <Link to={routes.VIEW_EXPENSES}>View Expenses</Link>
          <Link to={routes.USER_MANAGEMENT}>User Management</Link>
          <Link
            to={routes.HOME}
            onClick={() => {
              dispatch(LogoutAction());
            }}
          >
            Logout
          </Link>
        </>
      ) : (
        <Link to={routes.LOGIN}>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;

























































// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { RootState } from "../stateManagement/reducers";
// import routes from "../constants/routes";
// import { LogoutAction } from "../stateManagement/actions/adminAction";

// const Navbar = () => {
//   const { isLoggedIn } = useSelector((state: RootState) => state.adminReducer);

//   const dispatch = useDispatch();

//   return (
//     <nav>
//       <Link to={routes.HOME}>Home</Link>
//       {isLoggedIn ? (
//         <>
//           <Link to={routes.CATEGORY_MANAGEMENT}>Category Management</Link>
//           <Link to={routes.VIEW_EXPENSES}>View Expenses</Link>
//           <Link to={routes.USER_MANAGEMENT}>User Management</Link>
//           <Link
//             to={routes.HOME}
//             onClick={() => {
//               dispatch(LogoutAction());
//             }}
//           >
//             Logout
//           </Link>
//         </>
//       ) : (
//         <Link to={routes.LOGIN}>Login</Link>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
