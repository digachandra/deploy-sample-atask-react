export type UserRepoNode = {
  name: string;
  description: string;
  stars: number;
  url: string;
};

export type UserNode = {
  username: string;
  repositories: UserRepoNode[];
};
