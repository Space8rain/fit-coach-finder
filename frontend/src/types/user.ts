export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;

  age?: number;
  height?: number;
  weight?: number;
  role?: "client" | "coach";
  sex?: "male" | "female" | "other";
  subscriptions?: boolean;
}