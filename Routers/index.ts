import express from 'express';
import UserController from '../Controllers/UserController';
const router = express.Router();
import { validate, AddUserValidator, UpdateUserValidator } from '../Validators';

router.get('/', (req, res) => {
    res.json({ message: 'This is Express ' });
});
router.post('/user', validate(AddUserValidator), UserController.addUser);
router.delete('/user/:id', UserController.removeUser);
router.put('/user/:id', validate(UpdateUserValidator), UserController.updateUser);


export default router;
