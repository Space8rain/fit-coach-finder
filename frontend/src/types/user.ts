export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;

  age?: number;
  height?: number;
  weight?: number;
  role?: "client" | "coach";
  sex?: "male" | "female" | "other";
  subscriptions?: boolean;
}