import mongoose, { Schema, model, Types } from "mongoose";

const subcategorySchema = new Schema(
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
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    updatededBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const subcategoryModel = mongoose.model.Subcategory || model("Subcategory", subcategorySchema);
export default subcategoryModel;
