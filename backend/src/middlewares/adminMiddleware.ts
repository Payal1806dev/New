// // middleware/adminMiddleware.ts

// import { Request, Response, NextFunction } from 'express';
// import { UserModel } from '../features/users/userModel';
// // import User from '../models/User';

// export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await UserModel.findById(req.userId);
//     if (!user || !user.isAdmin) {
//       throw new Error('Unauthorized');
//     }
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ error: 'Forbidden' });
//   }
// };
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../features/users/userModel";
// import { UserModel } from '../models/User';
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import EnvConfig from "../config/envConfig";
const env = EnvConfig();
const SecretKey = env.secretKey;
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    const newToken = token.split(" ")[1];
    const decoded = jwt.verify(newToken, SecretKey) as JwtPayload;
    // req.userEmail = decoded.userEmail;
    req.userId = decoded.userId;
    // req.isAdmin = decoded.isAdmin;
    console.log(req.userId, "dshfisadgfusgfudgfufgvsadyjfgsdjgfdsgf");
    // if (!req.userId) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const user = await UserModel.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }
else 
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
