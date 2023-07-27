import { Model, DataTypes } from 'sequelize';
import sequelize from '../Configs/SequelizeConfig';
class User extends Model {
    public id!: number;
    public email!: string;
    public first_name!: string;
    public last_name!: string;
    public birthday_date!: Date;
    public timezone!: string;
    public location!: string;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserModel',
        tableName: 'Users',
        timestamps: false
    }
);

export default User;
