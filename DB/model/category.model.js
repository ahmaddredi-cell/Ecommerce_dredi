import mongoose, { Schema, model, Types } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    slug: {
      type: String,
      require: true,
    },
    image: {
      type: Object,
      required: true,
    },
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
  },
  { timestamps: true }
);
const categoryModel = mongoose.model.Category || model("Category", categorySchema);
export default categoryModel;
