import { useState, useEffect } from 'react';

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export function useGetUsers(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Usuário não encontrado');
        const data: GitHubUser = await response.json();
        setUser(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  return { user, loading, error };
}