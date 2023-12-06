import cartModel from "../../../DB/model/cart.model.js";
import couponModel from "../../../DB/model/coupon.model.js";
import orderModel from "../../../DB/model/order.model.js";
import productModel from "../../../DB/model/product.model.js";
import userModel from "../../../DB/model/user.model.js";

export const createOrder = async (req, res, next) => {
  const { couponName } = req.body;
  //check cart
  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new Error(`cart is Empty`, { cause: 400 }));
  }
  req.body.products = cart.products;
  //check coupon
  if (couponName) {
    const coupon = await couponModel.findOne({ name: couponName });
    if (!coupon) {
      return next(new Error(`coupon not found`, { cause: 400 }));
    }
    const currentDate = new Date();
    if (coupon.expireDate <= currentDate) {
      return next(new Error(`coupon expired`, { cause: 400 }));
    }
    if (coupon.usedBy.includes(req.user._id)) {
      return next(new Error(`coupon used `, { cause: 409 }));
    }
    req.body.coupon = coupon;
  }

  let subTotal = 0;
  let finalProductList = [];
  for (let product of req.body.products) {
    const checkProduct = await productModel.findOne({
      _id: product.productId,
      stock: { $gte: product.quantity },
    });
    if (!checkProduct) {
      return next(new Error(`product quantity not available`, { cause: 400 }));
    }
    //to convert BSON--->>Json
    product = product.toObject();
    product.name = checkProduct.name;
    product.unitPrice = checkProduct.price;
    product.discount = checkProduct.discount;
    product.finalPrice = product.quantity * checkProduct.finalPrice;
    subTotal += product.finalPrice;
    finalProductList.push(product);
  }

  const user = await userModel.findById(req.user._id);
  if (!req.body.address) {
    req.body.address = user.address;
  }
  if (!req.body.phone) {
    req.body.phone = user.phone;
  }
  const order = await orderModel.create({
    userId: req.user._id,
    products: finalProductList,
    finalPrice: subTotal - (subTotal * (req.body.coupon?.amount || 0)) / 100,
    address: req.body.address,
    phoneNumber: req.body.phone,
    couponName: req.body.couponName ?? "",
  });
  for (const product of req.body.products) {
    await productModel.updateOne({ _id: product.productId }, { $inc: { stock: -product.quantity } });
  }
  if (req.body.coupon) {
    await couponModel.updateOne({ userId: req.user._id }, { products: [] });
  }

  return res.json(order);
};
