// import axios from "axios";
// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { LoginAction } from "../stateManagement/actions/adminAction";
// import { useDispatch } from "react-redux";
// import { IUser } from "../interfaces/authInterface";
// import "./Login.css";
// type FormValues = {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   isAdmin: boolean;
//   token: string;
//   password: string;
// };

// const Login: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>();
//   const navigate = useNavigate();
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const onSubmit: SubmitHandler<FormValues> = async (data) => {
   
//     navigate("/");
//     setLoading(true);
//     setError(null);

//     try {
//       const { email, password } = data;

//       const response = await axios.post(
//         "http://localhost:5000/api/admin/admin-login",
//         { email, password, isAdmin: true }
//       );
      
//       if (response.data) {
//         const user: IUser = {
//           id: response.data.data.id,
//           first_name: response.data.data.first_name,
//           last_name: response.data.data.last_name,
//           email: response.data.data.email,
//           isAdmin: response.data.data.isAdmin,
//           token: response.data.data.token,
          
//         };
//         console.log("Server Response:", user);
//         dispatch(LoginAction(user));
//         console.log(">>>>>>>", data);
        
//       } else {
//         setError("Invalid credentials. Please try again.");
//       }
//     } catch (error: any) {
//       console.error("Login error:", error);
//       setError("Failed to log in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           {...register("email", { required: "Email is required" })}
//         />
//         {errors.email && <p>{errors.email.message}</p>}
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           {...register("password", { required: "Password is required" })}
//         />
//         {errors.password && <p>{errors.password.message}</p>}
//       </div>

//       <button type="submit" disabled={loading}>
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// };

// export default Login;




































import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginAction } from "../stateManagement/actions/adminAction";
import { useDispatch } from "react-redux";
import { IUser } from "../interfaces/authInterface";
import "./Login.css"; // Import the CSS file

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    navigate("/");
    setLoading(true);
    setError(null);

    try {
      const { email, password } = data;

      const response = await axios.post(
        "http://localhost:5000/api/admin/admin-login",
        { email, password, isAdmin: true }
      );

      if (response.data) {
        const user: IUser = {
          id: response.data.data.id,
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email,
          isAdmin: response.data.data.isAdmin,
          token: response.data.data.token,
        };
        dispatch(LoginAction(user));
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-container" onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
