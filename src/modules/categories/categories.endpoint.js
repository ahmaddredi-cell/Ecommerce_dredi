import { roles } from "../../middleware/auth.js";

export const endPointcategory = {
  create: [roles.Admin],
  getAlls: [],
  getActive: [roles.User],
  update: [roles.Admin],
  specific: [roles.Admin, roles.User],
};
