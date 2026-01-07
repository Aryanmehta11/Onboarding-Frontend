const BASE_URL = 'http://localhost:5009/api/admin';

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export async function getUsers(): Promise<AdminUser[]> {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
      // later: Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}
