import { useState } from 'react';
import Link from 'next/link';
import type { UserNode, UserRepoNode } from '@/app/types/user';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardAction } from './ui/card';

function Repository({ name, description, stars, url }: UserRepoNode) {
  return (
    <Card className="rounded-none border-0 bg-transparent shadow-none [&:nth-child(n+2)]:border-t">
      <CardHeader>
        <CardTitle className="flex gap-1" data-testid="user-repo-title">
          <Link href={url} target="_blank" rel="noreferrer">
            {name}
          </Link>
          <ExternalLink className="h-4 w-4" />
        </CardTitle>
        <CardDescription data-testid="user-repo-description">{description}</CardDescription>
        <CardAction>
          <span className="flex items-center gap-2 text-sm" data-testid="user-repo-star">
            {stars}
            <Star className="h-4 w-4" />
          </span>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

export default function User({ username, repositories }: UserNode) {
  const [isOpen, setIsOpen] = useState(false);
  const hasRepos = repositories.length > 0;

  return (
    <Card className="shadow-xs" data-testid={`user-${username}`}>
      <CardHeader
        onClick={hasRepos ? () => setIsOpen(!isOpen) : undefined}
        className={hasRepos ? 'cursor-pointer select-none' : undefined}
      >
        <CardTitle>@{username}</CardTitle>
        <CardDescription>
          {hasRepos ? 'Click to see public repositories' : 'User has no public repository'}
        </CardDescription>
        {hasRepos && (
          <CardAction className="self-center">
            <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </CardAction>
        )}
      </CardHeader>
      {isOpen && (
        <CardContent data-testid={`user-${username}-repos`}>
          <div className="overflow-hidden rounded-xl border bg-gray-50">
            {repositories.map((repo, index) => (
              <Repository
                key={`user-${username}-${index + 1}`}
                name={repo.name}
                description={repo.description}
                stars={repo.stars}
                url={repo.url}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
