import mongoose, { Schema, model, Types } from "mongoose";

const couponSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    usedBy: [
      {
        type: Types.ObjectId,
        ref: "user",
      },
    ],
    expiredDate: Date,
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "user",
    },
    updatededBy: {
      type: Types.ObjectId,
      ref: "user",
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
