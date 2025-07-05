import { z } from 'zod';

export const appSchema = z.object({
  username: z.string().min(1, 'Username is required'),
});

export type AppFormValues = z.infer<typeof appSchema>;
