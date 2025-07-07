'use client';

import type { UserNode } from '@/app/types/user';
import { ErrorBoundary } from 'react-error-boundary';
import { cn } from '@/lib/utils';
import User from './user';

type ResultMessageType = {
  text: string;
  className?: string;
};

function ResultMessage({ text, className }: ResultMessageType) {
  return <p className={cn('text-sm font-semibold', className)}>{text}</p>;
}

function ResultLoading({ username }: { username: string }) {
  const message = `Searching users for "@${username}"...`;
  return <ResultMessage text={message} />;
}

function ResultError({ username }: { username: string }) {
  const message = `Unable to fetch or render GitHub data for "@${username}". Please try again later.`;
  return <ResultMessage text={message} className="text-destructive" />;
}

function ResultNotFound({ username }: { username: string }) {
  const message = `No result for "@${username}".`;
  return <ResultMessage text={message} />;
}

type Props = {
  isLoading: boolean;
  isError: boolean;
  username: string;
  users: UserNode[];
};

export default function SearchResults({ isLoading, isError, username, users }: Props) {
  if (!username) return null;

  if (isLoading) return <ResultLoading username={username} />;
  if (isError) return <ResultError username={username} />;
  if (users.length === 0) return <ResultNotFound username={username} />;

  return (
    <ErrorBoundary fallback={<ResultError username={username} />}>
      <ResultMessage text={`Showing users for "@${username}"`} />
      {users.map((user, index) => (
        <User
          key={`user-${index + 1}-${user.username}`}
          username={user.username}
          repositories={user.repositories}
        />
      ))}
    </ErrorBoundary>
  );
}
