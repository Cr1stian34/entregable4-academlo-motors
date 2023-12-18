import Users from "../../modules/users/users.model.js";
import Repairs from "../../modules/repairs/repairs.model.js";

export const initModel = () => {
  Users.hasMany(Repairs, { foreignKey: "userId" });
  Repairs.belongsTo(Users, { foreignKey: "userId" });
};
