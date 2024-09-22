import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      min: 10,
      max: 100,
    },
    avatar: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/cute-panda-bear-avatar-cartoon-260nw-2115298928.jpg",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
