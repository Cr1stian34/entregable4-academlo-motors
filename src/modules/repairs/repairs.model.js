import { DataTypes } from "sequelize" 
import { sequelize } from "../../config/database/database.js"

const Repairs = sequelize.define("repairs", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    motorsNumber: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Repairs


