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
import { cn } from '@/lib/utils';
import { appSchema, type AppFormValues } from './schema';
import type { UserNode } from './types/user';

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

  const [users, setUsers] = useState<UserNode[]>([]);
  const [submittedUsername, setSubmittedUsername] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const fetchUsersAndRepos = async (keyword: string) => {
    const response = await fetch('/api/github', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return await response.json();
  };

  const onSubmit = async (data: AppFormValues) => {
    try {
      setIsError(false);
      setSubmittedUsername(data.username);
      setUsers([]);

      const usersWithRepos = await fetchUsersAndRepos(data.username);
      setUsers(usersWithRepos);
    } catch {
      setIsError(true);
      setUsers([]);
    }
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
      <Container className="space-y-4 py-6">
        {submittedUsername && (
          <p className={cn('text-sm font-semibold', isError && 'text-destructive')}>
            {isSubmitting
              ? `Searching users for "@${submittedUsername}"...`
              : !isError
                ? users.length > 0
                  ? `Showing users for "@${submittedUsername}"`
                  : `No result for "@${submittedUsername}"`
                : `Unable to fetch GitHub data for "@${submittedUsername}". Please try again later.`}
          </p>
        )}
        {users.map((user) => (
          <User key={user.username} username={user.username} repositories={user.repositories} />
        ))}
      </Container>
    </>
  );
}
