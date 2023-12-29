import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { UpdateFields } from './user.interface';

// Create an user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // Data validation using zod
    const zodParsedData = userValidationSchema.parse(user);

    const result = await UserServices.createUserIntoDB(zodParsedData); // Calling service function to send the data

    const filteredResult = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: filteredResult,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong! Failed to create user',
      error: {
        description: err.message,
      },
    });
  }
};

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong! Failed to fetch users',
      error: err,
    });
  }
};

// Get an user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);
    const result = await UserServices.getSingleUserFromDB(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong! Failed to fetch users',
      error: {
        code: err.message === 'User not found!' ? '404' : 500,
        description: err.message,
      },
    });
  }
};

// Update an user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);
    const updateFields: UpdateFields = req.body;
    await UserServices.updateUserFieldsFromDB(parsedUserId, updateFields);
    const user = await UserServices.getSingleUserFromDB(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: user,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong! Failed to fetch users',
      error: {
        code: err.message === 'User not found!' ? '404' : 500,
        description: err.message,
      },
    });
  }
};

// Delete an user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);
    await UserServices.deleteUserFromDB(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong! Failed to fetch users',
      error: {
        code: err.message === 'User not found!' ? '404' : 500,
        description: err.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
