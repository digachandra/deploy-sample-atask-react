'use server';

import { NextRequest, NextResponse } from 'next/server';

type GithubUserRepoNode = {
  name: string;
  description: string;
  stargazerCount: number;
  url: string;
};

type GithubUserNode = {
  login: string;
  repositories: {
    nodes: GithubUserRepoNode[];
  };
};

export async function POST(req: NextRequest) {
  const { keyword } = await req.json();
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const query = `
    query SearchUsers($query: String!) {
      search(type: USER, query: $query, first: 5) {
        nodes {
          ... on User {
            login
            repositories(first: 5, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
              nodes {
                name
                description
                stargazerCount
                url
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { query: keyword },
    }),
  });

  const json = await response.json();

  if (!response.ok || json.errors) {
    return NextResponse.json({ error: 'GitHub API error', details: json.errors }, { status: 500 });
  }

  const users = json.data.search.nodes.map((user: GithubUserNode) => ({
    username: user.login,
    repositories: user?.repositories?.nodes.map((repo: GithubUserRepoNode) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazerCount,
      url: repo.url,
    })),
  }));

  return NextResponse.json(users);
}
