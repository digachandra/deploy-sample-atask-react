'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
    },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    control,
  } = form;

  const onSubmit = async (data: any) => {
    // Simulate async Github API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <>
      <Header>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <AtSign className="text-muted-foreground h-4 w-4" />
                    </span>
                    <FormControl>
                      <Input placeholder="Type github username" className="pl-9" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </Form>
      </Header>
    </>
  );
}
