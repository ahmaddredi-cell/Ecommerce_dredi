import slugify from "slugify";
import cloudinary from "../../services/cloudinary.js";
import categoryModel from "../../../DB/model/category.model.js";

export const getCategories = async (req, res) => {
  const categoryList = await categoryModel.find();
  return res.status(200).json({ message: "success", categoryList });
};
export const getSpecficCategories = async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  return res.status(200).json({ message: "success", category });
};

export const createCategory = async (req, res) => {
  const name = req.body.name.toLowerCase();

  if (await categoryModel.findOne({ name })) {
    return res.status(409).json({ message: "category name already exists" });
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: `${process.env.APP_NAME}/categories`,
  });
  const cat = await categoryModel.create({ name, slug: slugify(name), image: { secure_url, public_id } });
  return res.status(201).json({ message: "success", cat });
};
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: `Invaliad category id ${req.params.id}` });
    }
    if (req.body.name) {
      if (await categoryModel.findOne({ name: req.body.params }).select("name")) {
        return res.status(409).json({ message: `catecogy ${req.body.name} already exists` });
      }

      category.name = req.body.name;
      category.slug = slugify(req.body.name);
    }
    if (req.body.status) {
      category.status = req.body.status;
    }
    if (req.file) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APP_NAME}/categories`,
      });
      await cloudinary.uploader.destroy(category.image.public_id);
      category.image = { secure_url, public_id };
    }
    await category.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: "error", err: err });
  }
};
export const activeCategories = async (req, res) => {
  const categoryActive = await categoryModel.find({ status: "Active" }).select("name image");
  return res.status(200).json({ message: "success", categoryActive });
};
