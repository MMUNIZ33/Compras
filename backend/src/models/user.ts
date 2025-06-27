export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string; // 'requester' | 'buyer' | 'approverA1' | 'approverA2'
}

export const users: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin'
  }
];
