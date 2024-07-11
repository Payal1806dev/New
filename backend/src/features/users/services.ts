import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserLogin, IUserRegister, IGoogleCredentials } from "./interface";
import { UserModel } from "./userModel";
import envConfig from "../../config/envConfig";

const response: {
  message: string;
  data?: any;
  success: boolean;
} = { message: "", success: false };
  
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
class UserService {
  async signUp(userData: IUserRegister) {
    try {
      const { first_name, last_name, email, password, isAdmin} = userData;

      console.log("userData: ", userData);

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        response.message = "User already exists";
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          first_name,
          last_name,
          email,
          password: hashedPassword,
         
        });
        const savedUser = await newUser.save();
        if (savedUser) {
          response.success = true;
          response.message = "User registered successfully";
        } else {
          response.message = "User registration failed";
        }
      }
      return response;
    } catch (error) {
      console.error("Error in signUp:", error);
      response.message = "An error occurred during user registration";
    }
  }

  async login(userData: IUserLogin) {
   

    const { email, password, isAdmin } = userData;

    console.log("password: ", password);

    console.log(userData);

    const user = await UserModel.findOne({ email });

    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        if (user.isAdmin === isAdmin) {
          const env = envConfig();

          const secretKey = env.secretKey;

          const token = jwt.sign(
            { userEmail: user.email, isAdmin: user.isAdmin },

            secretKey,

            { expiresIn: "1h" }
          );

          response.success = true;

          response.message = isAdmin
            ? "Admin logged in successfully"
            : "User logged in successfully";

          response.data = {
            token,

            id: user._id,

            first_name: user.first_name,

            last_name: user.last_name,

            email: user.email,

            isAdmin: user.isAdmin,
          };
        } else {
          response.message = isAdmin
            ? "Access denied. Admins only."
            : "Access denied. Users only.";
        }
      } else {
        response.message = "Invalid password";
      }
    } else {
      response.message = "User not found";
    }

    return response;
  }












  
  async  adminLogin(userData: IUserLogin) {
    const { email, password, isAdmin } = userData;
    // const response = {
    //   success: false,
    //   message: '',
    //   data: {}
    // };
  
    // Check if the user exists and isAdmin flag is true
    const user = await UserModel.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        if (isAdmin && user.isAdmin) { // Check if attempting to login as admin and user is admin
          const env = envConfig();
          const secretKey = env.secretKey;
  
          const token = jwt.sign(
            { userEmail: user.email, isAdmin: true }, // Include isAdmin flag in token payload
            secretKey,
            { expiresIn: "1h" }
          );
  
          response.success = true;
          response.message = "Admin logged in successfully";
          response.data = {
            token,
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            isAdmin: true // Include isAdmin flag in response data
          };
        } else {
          response.message = "Access denied. Admins only.";
        }
      } else {
        response.message = "Invalid password";
      }
    } else {
      response.message = "User not found";
    }
  
    return response;
  }
  













  async googleLogin(userData: IGoogleCredentials) {
    const { token } = userData;

    const decodedData = jwt.decode(token) as { email: string };
    const email = decodedData.email;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const env = envConfig();
      const secretKey = env.secretKey;

      const token = jwt.sign(
        { userEmail: existingUser.email, userId: existingUser._id },
        secretKey,
        {
          expiresIn: "1h",
        }
      );

      response.success = true;
      response.message = "User logged in successfully";
      response.data = {
        token,
        
          id: existingUser._id,
          first_name: existingUser.first_name,
          last_name: existingUser.last_name,
          email: existingUser.email,
        
      };
    } else {
      response.message = "User not found";
    }
    return response;
  }
}

export default new UserService();
