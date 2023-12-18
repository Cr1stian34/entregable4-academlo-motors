import Users from "../users/users.model.js"
import Repairs from "./repairs.model.js"

export class RepairsService {

    static async create(data) {
        return await Repairs.create(data)
    }

    static async findAll() {
        return await Repairs.findAll({
            where: {
                status: ["pending","completed"]
            },
            attributes: ["id","date","motorsNumber","description","status", "userId"],
            include: [
                {
                    model: Users,
                    attributes: ["name", "email", "role"]
                }
            ]
        })
    }

    static async findOne(id) {
        return await Repairs.findOne({
            where: {
                id: id
            }
        })
    }

    static async findOnePending(id){
        return await Repairs.findOne({
            where: {
                id: id,
                status: "pending"
            }
        })
    }

    static async update(repair, data) {
        return await repair.update(data)
    }

    static async delete(repair) {
        return await repair.update({
            status: "cancelled"
        })
    }
}
