import Users from "./users.model.js";

export class UsersService {
    static async create(data) {
        return await Users.create(data)
    }

    static async findAll() {
        return await Users.findAll({
            where: {
                status: "available"
            }
        });
    }

    static async findOne(id) {
        return await Users.findOne({
            where: {
                id: id,
                status: "available"
            }
        })
    }

    static async findOneByEmail(email){
        return await Users.findOne({
          where: {
            status: "available",
            email: email
          }
        })
      }

    static async update(user, data) {
        return await user.update(data)
    }

    static async delete(user) {
        return await user.update({
            status: "disabled"
        })
    }

}
