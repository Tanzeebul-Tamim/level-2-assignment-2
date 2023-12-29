import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Will call controller function
router.post('/', UserControllers.createUser); //creates an  user
router.get('/', UserControllers.getAllUsers); //retrieves all users
router.get('/:userId', UserControllers.getSingleUser); //retrieves a specific user
router.put('/:userId', UserControllers.updateUser); //updates a specific user
router.delete('/:userId', UserControllers.deleteUser); //deletes a specific user

export const UserRoutes = router;
