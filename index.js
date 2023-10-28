import "dotenv/config";
import express from "express";
import initApp from "./src/modules/app.router.js";

const app = express();

initApp(app, express);
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  return res.status(200).json("welcome...");
});
app.listen(PORT, () => {
  console.log(`seerver is running....${PORT}`);
});
