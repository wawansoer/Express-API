import express from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import User from '../Models/UserModel';

export const validate = (validations: ValidationChain[]) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            code: 400,
            message_code: "Failed add user",
            data: errors.array()
        });
    };
};

const isValidTimezoneFormat = (value: string) => {
    const timezoneRegex = /^[A-Za-z_\/]+$/;
    return timezoneRegex.test(value);
};

export const AddUserValidator = [
    body('email').isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            // Check if the email is already in use
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Email is already in use.');
            }
            return true;
        }),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('birthday_date').isISO8601().toDate().withMessage('Invalid birthday date'),
    body('timezone').notEmpty().withMessage('Timezone is required')
        .custom(isValidTimezoneFormat).withMessage('Timezone Format Is Invalid'),
    body('location').notEmpty().withMessage('Location is required'),
];
