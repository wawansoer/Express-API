import { Model, DataTypes } from 'sequelize';
import sequelize from '../Configs/SequelizeConfig';
class Task extends Model {
    public id!: number;
    public email!: string;
    public message!: string;
    public sent!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'TaskModel',
        tableName: 'Task',
    }
);

export default Task;
