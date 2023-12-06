import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import subcategoryModel from "../../../DB/model/subcategory.model.js";
import productModel from "../../../DB/model/product.model.js";
import cloudinary from "../../services/cloudinary.js";
import { customAlphabet, nanoid } from "nanoid";

export const getProducts = async (req, res) => {
  const products = await productModel.find();
  return res.status(201).json({ message: "success", products });
};

export const getProduct = async (req, res) => {
  const products = await productModel.find({ categoryId: req.params.categoryId });
  return res.status(201).json({ message: "success", products });
};

export const getProductWithCategory = async (req, res) => {
  const product = await productModel.findById(req.params.productId);
  return res.status(201).json({ message: "success", product });
};

export const createProducts = async (req, res) => {
  try {
    const { name, price, discount, categoryId, subcategoryId } = req.body;

    if (await productModel.findOne({ name })) {
      return res.status(409).json({ message: "product name already exists" });
    }
    let fileProdName = nanoid(4);

    const checkCategory = await categoryModel.findById(categoryId);
    const checkSubCategory = await subcategoryModel.findById(subcategoryId);
    if (!checkCategory) {
      return res.status(404).json({ message: "category not found" });
    }
    if (!checkSubCategory) {
      return res.status(404).json({ message: "subcategory not found" });
    }
    req.body.slug = slugify(name);
    req.body.finalPrice = (price - (price * (discount || 0)) / 100).toFixed(2);
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
      folder: `${process.env.APP_NAME}/products/${fileProdName}_${req.body.name}/mainImages`,
    });
    req.body.mainImage = { secure_url, public_id };
    req.body.subImages = [];
    for (const file of req.files.subImages) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
        folder: `${process.env.APP_NAME}/products/${fileProdName}_${req.body.name}/subImages`,
      });
      req.body.subImages.push({ secure_url, public_id });
    }
    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;
    const product = await productModel.create(req.body);
    if (!product) {
      return res.status(400).json({ message: "error while creating product" });
    }
    return res.status(200).json({ message: "success", product });
  } catch (err) {
    return res.json(err);
  }
};
