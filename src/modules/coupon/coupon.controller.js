import couponModel from "../../../DB/model/coupon.model.js";

export const createCoupon = async (req, res) => {
  const { name } = req.body;
  req.body.expireDate = new Date(req.body.expireDate);
  if (await couponModel.findOne({ name })) {
    return res.status(404).json({ message: "coupon name already exist" });
  }

  const coupon = await couponModel.create(req.body);
  return res.status(201).json({ message: "coupon created successfully", coupon });
};

export const getCoupons = async (req, res) => {
  const coupons = await couponModel.find({ isDeleted: false });
  return res.status(201).json({ message: "all copns", coupons });
};

export const updateCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;
    const { name, amount } = req.body;

    const coupon = await couponModel.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (await couponModel.findOne({ name })) {
      return res.status(404).json({ message: `Coupon ${name} already exists` });
    }
    const couponUpdated = await couponModel.findByIdAndUpdate(couponId, { name, amount }, { new: true });

    return res.status(201).json({ message: "success", couponUpdated });
  } catch (err) {
    return res.json(err);
  }
};

export const softDelete = async (req, res) => {
  const { id } = req.params;
  const coupon = await couponModel.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });
  if (!coupon) {
    return res.status(404).json({ message: "cant deleted this coupon" });
  }
  return res.status(201).json({ message: "success" });
};

export const hardDelete = async (req, res) => {
  const { id } = req.params;
  const coupon = await couponModel.findOneAndDelete({ _id: id, isDeleted: true });
  if (!coupon) {
    return res.status(404).json({ message: "cant deleted this coupon" });
  }
  return res.status(201).json({ message: "success" });
};

export const restore = async (req, res) => {
  const { id } = req.params;
  const coupon = await couponModel.findOneAndUpdate({ _id: id, isDeleted: true }, { isDeleted: false }, { new: true });
  if (!coupon) {
    return res.status(404).json({ message: "cant restore this coupon" });
  }
  return res.status(201).json({ message: "success" });
};
