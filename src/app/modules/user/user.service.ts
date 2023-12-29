import { User } from '../user.model';
import { TUser, UpdateFields } from './user.interface';

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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFieldsFromDB,
  deleteUserFromDB,
};
