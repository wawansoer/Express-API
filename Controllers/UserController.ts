import { Request, Response } from 'express';
import UserService from '../Services/UserService';
import { body, validationResult } from 'express-validator';

const UserController = {

    async addUser(req: Request, res: Response): Promise<void> {
        try {
            const UserValidation = {
                addUserValidationRules: [
                    body('email').isEmail().withMessage('Invalid email address'),
                    body('first_name').notEmpty().withMessage('First name is required'),
                    body('last_name').notEmpty().withMessage('Last name is required'),
                    body('birthday_date').isISO8601().toDate().withMessage('Invalid birthday date'),
                    body('timezone').notEmpty().withMessage('Timezone is required'),
                ]
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            const { email, first_name, last_name, birthday_date, timezone, location } = req.body;
            const user = await UserService.addUser({
                email,
                first_name,
                last_name,
                birthday_date,
                timezone,
                location
            });
            res.status(201).json({ user });
        } catch (error) {
            console.error(error)
            res.status(500).json({
                error: 'Failed to add user.',
                message: error
            });
        }
    },

    async removeUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            await UserService.removeUser(userId);
            res.status(200).json({ message: 'User removed successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove user.' });
        }
    }
}

export default UserController;
