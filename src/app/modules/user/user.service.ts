import { User } from '../user.model';
import { TUser, UpdateFields } from './user.interface';

const createUserIntoDB = async (user: TUser) => {
  if (await User.doesUserExists(user.userId)) {
    throw new Error('User Already Exists');
  }
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    '-userId -password -isActive -hobbies -orders -_id',
  );
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await User.findOne({ userId: id }).select(
    '-password -orders -_id',
  );
  return result;
};

const updateUserFieldsFromDB = async (
  userId: number,
  updatedFields: UpdateFields,
) => {
  const result = await User.updateOne(
    { userId },
    { $set: updatedFields },
  ).select('-password -orders -_id');
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFieldsFromDB,
};
