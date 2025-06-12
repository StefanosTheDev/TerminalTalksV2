import { z } from 'zod';
export const createAccountSchema = z.object({
  username: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3),
  role: z.string().default('user'),
});
