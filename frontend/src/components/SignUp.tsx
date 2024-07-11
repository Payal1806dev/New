// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// // import { Login } from './Login';
// import { LoginAction } from '../stateManagement/actions/authAction';

// const SignUp: React.FC = () => {
//   const [firstName, setFName] = useState('');
//   const [lastName, setLName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/signup', { firstName,lastName, email, password });
//       dispatch(LoginAction (res.data.token));
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <h2>Sign Up</h2>
//       <div>
//         <label>First Name:</label>
//         <input type="text" value={firstName} onChange={(e) => setFName(e.target.value)} required />
//       </div>

//       <div>
//         <label>Last Name:</label>
//         <input type="text" value={lastName} onChange={(e) => setLName(e.target.value)} required />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUp;

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginAction } from "../stateManagement/actions/authAction";
import { useNavigate } from "react-router-dom";
import routes from "../constatnts/routes";
// import "./SignUp.css";
type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data: ", data);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", data);
      navigate(routes.LOGIN)
    } catch (error: any) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign Up</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          {...register("first_name", { required: "First Name is required" })}
        />
        {errors.first_name && <p>{errors.first_name.message}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          {...register("last_name", { required: "Last Name is required" })}
        />
        {errors.last_name && <p>{errors.last_name.message}</p>}
      </div>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
