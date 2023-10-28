import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: [true, "username is require"],
      min: 4,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: Object,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model.User || model("User", userSchema);
export default userModel;
