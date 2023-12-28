import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    // Calling service function to send the data
    const user = req.body;
    const result = await UserServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Couldn't create user",
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
};
