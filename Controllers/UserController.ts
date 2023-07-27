import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import { body, validationResult } from 'express-validator';

const UserController = {

    async addUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, first_name, last_name, birthday_date, timezone, location } = req.body;
            const user = await UserService.addUser({
                email,
                first_name,
                last_name,
                birthday_date,
                timezone,
                location
            });
            res.status(201).json({
                code: 201,
                message: "Success created user",
                data: user
            });
        } catch (error) {
            console.error(error)
            res.status(500).json({
                code: 500,
                message: 'Failed to add user.',
                data: error
            });
        }
    },
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const { email, first_name, last_name, birthday_date, timezone, location } = req.body;

            const updatedUser = await UserService.updateUser(userId, {
                email,
                first_name,
                last_name,
                birthday_date,
                timezone,
                location
            });

            if (!updatedUser) {
                res.status(404).json({ message: 'User not found.' });
            } else {
                res.status(200).json({
                    code: 200,
                    message: 'User details updated successfully.',
                    data: updatedUser
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ code: 500, message: 'Failed to update user.', data: error });
        }
    },

    async removeUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            await UserService.removeUser(userId);
            res.status(200).json({ message: 'User removed successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove user.' });
        }
    }
}

export default UserController;
