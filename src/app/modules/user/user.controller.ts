import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';
import { TOrder, UpdateFields } from './user.interface';

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

// Add order to an user
const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);
    const updateFields: TOrder = req.body;
    await UserServices.createOrderInUserInDB(parsedUserId, updateFields);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

// Retrieve all orders for an user
const retrieveOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);
    const result = await UserServices.retrieveOrderFromUserFromDB(parsedUserId);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
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

// Retrieve total price of orders for an user
const retrieveTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);
    const user = await UserServices.getTotalPrice(parsedUserId);
    const orders: TOrder[] | undefined = user?.orders;
    if (orders && orders.length > 0) {
      const totalPrice = orders.reduce(
        (total: number, order: TOrder): number => {
          const orderTotal = order.price * order.quantity;
          total += orderTotal;
          return total;
        },
        0,
      );
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: totalPrice,
      });
    }

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
  createOrder,
  retrieveOrder,
  retrieveTotalPrice,
};
