export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'admin' | 'marchand' | 'client';
  balance: number;
  parrainId?: string;
}