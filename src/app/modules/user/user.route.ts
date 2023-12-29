import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Will call controller function
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);

export const UserRoutes = router;
