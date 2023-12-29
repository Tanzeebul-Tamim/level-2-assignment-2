import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TAddress,
  TName,
  TOrders,
  TUser,
  UserModel,
} from './user/user.interface';
import config from '../config';

const fullNameSchema = new Schema<TName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is a required field'],
      validate: {
        validator: function (value: string) {
          const firstNameStr =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          return firstNameStr === value;
        },
        message: "{VALUE} doesn't follow the supported capitalized format",
      },
    },
    lastName: {
      type: String,
      required: [true, 'Last name is a required field'],
      validate: {
        validator: function (value: string) {
          const lastNameStr =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          return lastNameStr === value;
        },
        message: "{VALUE} doesn't follow the supported capitalized format",
      },
    },
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    street: {
      type: String,
      required: [true, 'Street is a required field'],
    },
    city: {
      type: String,
      required: [true, 'City is a required field'],
    },
    country: {
      type: String,
      required: [true, 'Street is a required field'],
    },
  },
  { _id: false },
);

const orderSchema = new Schema<TOrders>(
  {
    productName: {
      type: String,
      required: [true, 'Product name is a required field'],
    },
    price: {
      type: Number,
      required: [true, 'Price is a required field'],
    },
    quantity: {
      type: Number,
      required: [true, 'Price is a required field'],
    },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is a required field'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is a required field'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is a required field'],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, 'Full name is a required field'],
    },
    age: {
      type: Number,
      required: [true, 'Age is a required field'],
    },
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    hobbies: {
      type: [String],
      required: [true, 'Product name is a required field'],
    },
    address: {
      type: addressSchema,
      required: [true, 'Address is a required field'],
    },
    orders: {
      type: [orderSchema],
      required: false,
    },
  },
  { versionKey: false },
);

// Pre save middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));
  next();
});

// Creating a custom static method
userSchema.statics.doesUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
