import connectDB from "../../DB/connection.js";
import categoriesRouter from "./categories/categories.router.js";
import productsRouter from "./products/products.router.js";
import subcategoryRouter from "./subcategory/subcategory.router.js";
import authRouter from "./auth/auth.router.js";
import couponRouter from "./coupon/coupon.router.js";

const initApp = async (app, express) => {
  app.use(express.json());

  connectDB();
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "welcome" });
  });
  app.use("/auth", authRouter);
  app.use("/categories", categoriesRouter);
  app.use("/products", productsRouter);
  app.use("/subcategory", subcategoryRouter);
  app.use("/coupon", couponRouter);
  app.get("*", (req, res) => {
    return res.status(500).json({ message: "page not found" });
  });
};
export default initApp;
