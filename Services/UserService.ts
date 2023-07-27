import sequelize from '../Configs/SequelizeConfig';
import { Op } from 'sequelize';
import User from '../Models/UserModel';
import { error } from 'console';

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
        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            throw error;
        }

        await User.destroy({ where: { id } });
    }
    async updateUser(userId: number, updatedUserData: {
        email?: string;
        first_name?: string;
        last_name?: string;
        birthday_date?: Date;
        timezone?: string;
        location?: string;
    }): Promise<User | null> {
        try {
            // Find the user by ID
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                // User not found
                return null;
            }

            // Update the user's data with the provided fields
            await user.update(updatedUserData);

            // Return the updated user
            return user;
        } catch (error) {
            // Handle errors here if needed
            throw error;
        }
    }
    async getUsersWithBirthdayAt9AM() {
        try {
            const users = await User.findAll({
                attributes: ['email', 'first_name', 'last_name', 'birthday_date', 'timezone', 'location'],
                where: {
                    [Op.and]: [
                        sequelize.literal(`EXTRACT(HOUR FROM NOW() AT TIME ZONE "timezone") = 8`),
                        sequelize.literal(`EXTRACT(MINUTE FROM NOW() AT TIME ZONE "timezone") BETWEEN 55 AND 65`),
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
