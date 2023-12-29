import { Model } from 'mongoose';

export type TName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};

// Type for updating users
export type UpdateFields = Partial<Record<keyof TUser, TUser[keyof TUser]>>;

// For creating static
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  doesUserExists(id: number): Promise<TUser | null>;
}
