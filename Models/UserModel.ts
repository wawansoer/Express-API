import { Model, DataTypes } from 'sequelize';
import sequelize from '../Configs/SequalizeConfig';

class User extends Model {
    public email!: string;
    public first_name!: string;
    public last_name!: string;
    public birthday_date!: Date;
    public timezone!: string;
    public location!: string;
}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
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
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'UserModel',
        tableName: 'user',
        timestamps: false
    }
);

export default User;
