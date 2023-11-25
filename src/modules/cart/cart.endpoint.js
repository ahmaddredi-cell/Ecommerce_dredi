import { roles } from "../../middleware/auth.js";

export const endPointcart = {
  create: [roles.User],
  delete: [roles.User],
  clear: [roles.User],
  get: [roles.User],
};
