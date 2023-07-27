import sequelize from '../Configs/SequelizeConfig';
import { Op } from 'sequelize';
import User from '../Models/UserModel';

class UserService {
    async addUser(userInput: {
        email: string;
        first_name: string;
        last_name: string;
        birthday_date: Date;
        timezone: string;
        location: string;
    }): Promise<User> {
        return User.create(userInput);
    }

    async removeUser(id: number): Promise<void> {
        await User.destroy({ where: { id } });
    }

    async getUsersWithBirthdayAt9AM() {
        try {
            const users = await User.findAll({
                attributes: ['email', 'first_name', 'last_name', 'birthday_date', 'timezone', 'location'],
                where: {
                    [Op.and]: [
                        sequelize.literal(`EXTRACT(HOUR FROM NOW() AT TIME ZONE "timezone") = 8`),
                        sequelize.literal(`EXTRACT(MINUTE FROM NOW() AT TIME ZONE "timezone") BETWEEN 46 AND 59`),
                        sequelize.literal(`DATE_PART('month', NOW() AT TIME ZONE "timezone") = DATE_PART('month', "birthday_date" AT TIME ZONE "timezone")`),
                        sequelize.literal(`DATE_PART('day', NOW() AT TIME ZONE "timezone") = DATE_PART('day', "birthday_date" AT TIME ZONE "timezone")`),
                    ],
                },
            });

            return users;
        } catch (error) {
            console.error('Error executing query:', error);
            return [];
        }
    }
}

export default new UserService();
