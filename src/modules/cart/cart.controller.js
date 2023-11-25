import cartModel from "../../../DB/model/cart.model.js";

export const createCart = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user._id;

    // Find the user's cart
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new cart
      const newCart = await cartModel.create({ userId, products });
      return res.status(201).json({ message: "success", newCart });
    }

    // If the cart already exists, update the products
    for (const product of products) {
      const existingProductIndex = cart.products.findIndex((p) => p.productId.toString() === product.productId);

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update the quantity
        cart.products[existingProductIndex].quantity += product.quantity || 1;
      } else {
        // If the product is not in the cart, add it
        cart.products.push(product);
      }
    }

    // Save the updated cart
    await cart.save();

    return res.json({ message: "Cart updated successfully", cart });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const removeItem = async (req, res) => {
  const { productId } = req.body;
  await cartModel.updateOne(
    { userId: req.user._id },
    {
      $pull: { products: { productId } },
    }
  );
  return res.status(200).json({ message: "success" });
};

export const clearCart = async (req, res) => {
  const clearCart = await cartModel.updateOne(
    { userId: req.user._id },
    {
      products: [],
    }
  );
  return res.status(200).json({ message: "success" });
};
export const getCart = async (req, res) => {
  const cart = await cartModel.findOne({ userId: req.user._id });
  return res.status(200).json({ message: "success", cart: cart });
};
