import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardAction } from './ui/card';

type RepositoryProps = {
  title: string;
  description: string;
  stars: number;
  href: string;
};

function Repository({ title, description, stars, href }: RepositoryProps) {
  return (
    <Card className="rounded-none border-0 bg-transparent shadow-none even:border-t">
      <CardHeader>
        <CardTitle className="flex gap-1">
          <Link href={href} target="_blank" rel="noreferrer">
            {title}
          </Link>
          <ExternalLink className="h-4 w-4" />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <span className="flex items-center gap-2 text-sm">
            {stars}
            <Star className="h-4 w-4" />
          </span>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

type UserProps = {
  username: string;
  repositories: RepositoryProps[];
};

export default function User({ username, repositories }: UserProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="shadow-xs">
      <CardHeader onClick={() => setIsOpen(!isOpen)} className="cursor-pointer select-none">
        <CardTitle>@{username}</CardTitle>
        <CardDescription>Click to see repositories</CardDescription>
        <CardAction className="self-center">
          <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CardAction>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="overflow-hidden rounded-xl border bg-gray-50">
            {repositories.map((repo) => (
              <Repository
                key={repo.href}
                title={repo.title}
                description={repo.description}
                stars={repo.stars}
                href={repo.href}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
