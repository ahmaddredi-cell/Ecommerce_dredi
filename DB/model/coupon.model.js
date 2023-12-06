import mongoose, { Schema, model, Types } from "mongoose";

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    usedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    expireDate: { type: Date, required: true },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    updatededBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const couponModel = mongoose.model.Coupon || model("Coupon", couponSchema);
export default couponModel;
