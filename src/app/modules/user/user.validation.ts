import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters long' })
    .max(20, { message: 'First name cannot be longer than 20 characters' })
    .trim(),
  lastName: z
    .string()
    .min(3, { message: 'Last name must be at least 3 characters long' })
    .max(20, { message: 'Last name cannot be longer than 20 characters' })
    .trim(),
});

const addressValidationSchema = z.object({
  street: z
    .string()
    .min(1)
    .max(10, { message: 'Street name cannot be longer than 10 characters' })
    .trim(),
  city: z
    .string()
    .min(1)
    .max(10, { message: 'City name cannot be longer than 10 characters' })
    .trim(),
  country: z
    .string()
    .min(1)
    .max(10, { message: 'Country name cannot be longer than 10 characters' })
    .trim(),
});

const orderValidationSchema = z.object({
  productName: z.string().min(1).trim(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number().readonly(),
  username: z
    .string()
    .min(1)
    .max(15, { message: 'Username cannot be longer than 15 characters' })
    .trim(),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters long' })
    .max(20, { message: 'Password cannot be longer than 20 characters' }),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z
    .string()
    .min(5, { message: 'Email must be at least 5 characters long' })
    .email()
    .trim(),
  isActive: z.boolean().default(true),
  hobbies: z.array(
    z
      .string()
      .min(1)
      .max(10, { message: 'Hobby name cannot be longer than 10 characters' })
      .trim(),
  ),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
