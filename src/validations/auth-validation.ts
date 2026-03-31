import * as z from "zod"

export const loginSchema = z.object({
    email: z.email(). nonempty({ message: 'Email is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export type LoginForm = z.infer<typeof loginSchema>;