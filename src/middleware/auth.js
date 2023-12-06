import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";

export const roles = {
  Admin: "Admin",
  User: "User",
};
export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization?.startsWith(process.env.BEARERKEY)) {
        return res.status(401).json({ message: "Ivalid authorization" });
      }

      const token = authorization.split(process.env.BEARERKEY)[1];
      const decoded = jwt.verify(token, process.env.LOGINSECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Invaliad authorizatin" });
      }

      const user = await userModel.findById(decoded.id).select("userName role changePasswordTime");

      if (!user) {
        return res.status(401).json({ message: "user not register" });
      }

      //getTime() convert datenow to server languge and we devide 1000 to convert sec to millesec and compare between change paww and iat
      if (parseInt(user.changePasswordTime?.getTime() / 1000) > decoded.iat) {
        return next(new Error(`expired token ,plz login`, { cause: 400 }));
      }

      // access role is empty (false) the second part is skipped ,code inside the if statement is not executed.
      if (accessRoles.length > 0 && !accessRoles.includes(user.role)) {
        return res.status(403).json({ message: "not auth user" });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.json(err);
    }
  };
};
