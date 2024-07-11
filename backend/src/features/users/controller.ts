// import { Request, Response } from 'express';
// import { UserService } from './services';

// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//   const { fname, lname, email, password } = req.body;
//   try {
//     const response = await UserService.signUp({ fname, lname, email, password });
//     if (response.success) {
//       res.status(201).json({ message: response.message });
//     } else {
//       res.status(400).json({ message: response.message });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;
//   try {
//     const response = await UserService.login({ email, password });
//     if (response.success) {
//       res.status(200).json({ user: response.data.user, token: response.data.token });
//     } else {
//       res.status(400).json({ message: response.message });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const googleLoginUser = async (req: Request, res: Response): Promise<void> => {
//   const { tokenId } = req.body;
//   try {
//     const response = await UserService.googleLogin({ token: tokenId });
//     if (response.success) {
//       res.status(200).json({ user: response.data.user, token: response.data.token });
//     } else {
//       res.status(400).json({ message: response.message });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// import { Request, Response } from 'express';
// import UserService from '../services/UserService';
// import { IUserRegister, IUserLogin, IGoogleCredential } from '../services/interface';

import { Request, Response } from "express";
import { IGoogleCredentials, IUserLogin, IUserRegister } from "./interface";
import UserService from "./services";
import express from "express";
interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const registerUser = async (req: express.Request, res: Response) => {
  console.log("hello");

  console.log("req.body: ", req.body);

  try {
    const response = await UserService.signUp(req.body);

    if (response) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.log(error);
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




export const loginUser = async (req: Request, res: Response) => {
  try {
    const response = await UserService.login(req.body);
    if (response.success) {
      res
        .status(200)
        .json({ user: response.data.user, token: response.data.token });
    } else {
      res.status(400).json({ message: response.message });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};










export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const response = await UserService.adminLogin(req.body);
    if (response.success) {
      res
        .status(200)
        .json({ user: response.data, token: response.data?.token });
    } else {
      res.status(400).json({ message: response.message });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const response = await UserService.login(req.body);
//     if (response.success) {
//       res
//         .status(200)
//         .json({ user: response.data.user, token: response.data.token });
//     } else {
//       res.status(400).json({ message: response.message });
//     }
//   } catch (error) {
//     console.error("Error in loginUser:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password, isAdminLogin } = req.body;

//     // Call the loginUser service with the required parameters
//     const response = await UserService.login(req.body);

//     if (response.success) {
//       res.status(200).json({ user: response.data, token: response.data?.token });
//     } else {
//       res.status(400).json({ message: response.message });
//     }
//   } catch (error) {
//     console.error("Error in loginUser:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


export const googleLoginUser = async (req: Request, res: Response) => {
  try {
    const response = await UserService.googleLogin(req.body);

    if (response.success) {
      res
        .status(200)
        .json({ user: response.data.user, token: response.data.token });
    } else {
      res.status(400).json({ message: response.message });
    }
  } catch (error) {
    console.error("Error in googleLoginUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
