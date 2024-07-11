import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    first_name: {
      type: String,
      unique: true,
      required: true,
    },
    last_name: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      
     
    },
    role:{
      type: String,
      enum: ['admin', 'user'],
      
    }
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", userSchema);
