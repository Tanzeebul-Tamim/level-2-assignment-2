import { Schema, model } from 'mongoose';
import { TAddress, TName, TOrders, TUser } from './user/user.interface';

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
          const lastName =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          return lastName === value;
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

const userSchema = new Schema<TUser>(
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

export const UserModel = model<TUser>('User', userSchema);
