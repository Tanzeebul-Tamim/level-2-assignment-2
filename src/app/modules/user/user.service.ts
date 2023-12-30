import { User } from '../user.model';
import { TOrder, TUser, UpdateFields } from './user.interface';

// Create an user
const createUserIntoDB = async (user: TUser) => {
  if (await User.doesUserExists(user.userId)) {
    throw new Error('User ID already in use');
  }
  const result = await User.create(user);
  return result;
};

// Get all users
const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    '-userId -password -isActive -hobbies -orders -_id',
  );
  return result;
};

// Get an user
const getSingleUserFromDB = async (userId: number) => {
  const userExist = await User.doesUserExists(userId);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId }).select(
    '-password -orders -_id',
  );
  return result;
};

// Update an user
const updateUserFieldsFromDB = async (
  userId: number,
  updatedFields: UpdateFields,
) => {
  const userExist = await User.doesUserExists(userId);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.updateOne(
    { userId },
    { $set: updatedFields },
  ).select('-password -orders -_id');
  return result;
};

// Delete an user
const deleteUserFromDB = async (userId: number) => {
  const userExist = await User.doesUserExists(userId);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

// Create order
const createOrderInUserInDB = async (userId: number, order: TOrder) => {
  const userExist = await User.doesUserExists(userId);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.updateOne(
    { userId },
    { $addToSet: { orders: order } },
  );
  return result;
};

// Retrieve order
const retrieveOrderFromUserFromDB = async (userId: number) => {
  const userExist = await User.doesUserExists(userId);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId }).select('orders -_id');
  return result;
};

// Retrieve total price for orders for an user
const getTotalPrice = async (userId: number) => {
  const userExist = await User.doesUserExists(userId);
  if (!userExist) {
    throw new Error('User not found!');
  }
  const result = await User.findOne({ userId }).select('orders');
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFieldsFromDB,
  deleteUserFromDB,
  createOrderInUserInDB,
  retrieveOrderFromUserFromDB,
  getTotalPrice,
};
