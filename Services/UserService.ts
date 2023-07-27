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

    async removeUser(id: string): Promise<void> {
        await User.destroy({ where: { id } });
    }
}

export default new UserService();
