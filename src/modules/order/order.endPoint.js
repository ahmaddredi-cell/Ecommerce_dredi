import { roles } from "../../middleware/auth.js";

export const endPointOrder = {
  create: [roles.User],
};
