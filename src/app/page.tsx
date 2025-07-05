'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Container from '@/components/container';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import User from '@/components/user';
import { appSchema, type AppFormValues } from './schema';

export default function Page() {
  const form = useForm<AppFormValues>({
    resolver: zodResolver(appSchema),
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

  const [users, setUsers] = useState<
    {
      username: string;
      repositories: { title: string; description: string; stars: number; href: string }[];
    }[]
  >([]);

  const [submittedUsername, setSubmittedUsername] = useState('');

  async function onSubmit(values: AppFormValues) {
    // Simulate async Github API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmittedUsername(values.username);
    setUsers([
      {
        username: values.username,
        repositories: [
          {
            title: 'awesome-project',
            description: 'A description of awesome-project.',
            stars: 128,
            href: 'https://github.com/example/awesome-project',
          },
          {
            title: 'nextjs-blog',
            description: 'A blog starter built with Next.js.',
            stars: 256,
            href: 'https://github.com/example/nextjs-blog',
          },
        ],
      },
    ]);
  }

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
                      <Input
                        placeholder="Type github username"
                        className="pl-9"
                        {...field}
                        disabled={isSubmitting}
                      />
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
      <Container className="space-y-6 py-6">
        {submittedUsername && (
          <p className="text-sm font-semibold">Showing users for &quot;{submittedUsername}&quot;</p>
        )}
        {users.map((user) => (
          <User key={user.username} username={user.username} repositories={user.repositories} />
        ))}
      </Container>
    </>
  );
}
