// // import { Request, Response, NextFunction } from 'express';
// // import jwt from 'jsonwebtoken';
// // import envConfig from '../config/envConfig';

// // interface AuthenticatedRequest extends Request {
// //   userId?: string;
// // }
// // const env = envConfig();
// // const SecretKey = env.secretKey;
// // export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
// //   const token = req.header('Authorization')?.replace('Bearer ', '');

// //   if (!token) {
// //     return res.status(401).json({ error: 'Unauthorized' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, SecretKey) as { userId: string };
// //     req.userId = decoded.userId;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ error: 'Unauthorized' });
// //   }
// // };

// import { Request, Response, NextFunction } from "express";
// import jwt, { decode, JwtPayload } from "jsonwebtoken";
// import EnvConfig from "../config/envConfig";
// import { isAdmin } from "./adminMiddleware";

// export interface CustomRequest extends Request {
//   userEmail?: string | JwtPayload;
//   userid: string | JwtPayload;
//   isAdmin?: boolean;
// }

// const env = EnvConfig();
// const SecretKey = env.secretKey;

// export const verifyToken = (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const token = req.header("Authorization");
//   if (!token) {
//     res.status(401).json({ error: "Access denied" });
//     return;
//   }
//   try {
//     const newToken = token.split(" ")[1];
//     const decoded = jwt.verify(newToken, SecretKey) as JwtPayload;
//     req.userEmail = decoded.userEmail;
//     req.userid = decoded.userId;
//     req.isAdmin = decoded.isAdmin;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// export const authenticate = (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ): void => {
//   if (req.isAdmin) {
//     res.status(403).json({ error: "Access restricted to admin only" });
//     return;
//   }
//   next();
// };

// export default { verifyToken, authenticate };






import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import EnvConfig from "../config/envConfig";

export interface CustomRequest extends Request {
  userEmail?: string | JwtPayload;
  userRole?: string;
  userId?:string;
}

const env = EnvConfig();
const SecretKey = env.secretKey;

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  try {
    const newToken = token.split(" ")[1];
    const decoded = jwt.verify(newToken, SecretKey) as JwtPayload;
    req.userEmail = decoded.userEmail;
    req.userRole = decoded.userRole; 
    req.userId= decoded.userId; 
    console.log(">>>iiii",req.userRole)
    console.log(">>>", decoded)
    next();

  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// export const adminOnly = (req: CustomRequest, res: Response, next: NextFunction): void => {
//   console.log(req)

//   if (req.userRole !== 'admin') {
//     res.status(403).json({ error: "Access restricted to admin only" });
//     return;
//   }
//   next();
// };

export default  { verifyToken,  };
