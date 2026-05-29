import { createContext } from 'react';

export type TrainerStatus = 'offline' | 'online' | 'busy';

interface TrainerStatusContextType {
  status: TrainerStatus;
  toggleStatus: () => Promise<void>;
  isLoading: boolean;
}

export const TrainerStatusContext = createContext<TrainerStatusContextType | null>(null);