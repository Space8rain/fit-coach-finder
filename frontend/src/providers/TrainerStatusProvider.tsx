import { useEffect, useState, type ReactNode } from "react";
import { TrainerStatusContext, type TrainerStatus } from "../context/TrainerStatusContext";

export const TrainerStatusProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<TrainerStatus>('offline');
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка статуса при старте (из localStorage пока)
  useEffect(() => {
    const savedStatus = localStorage.getItem('trainerStatus') as TrainerStatus | null;
    if (savedStatus) {
      setStatus(savedStatus);
    }
    setIsLoading(false);
  }, []);

  // Сохранение в localStorage (временное решение)
  useEffect(() => {
    localStorage.setItem('trainerStatus', status);
  }, [status]);

  const toggleStatus = async () => {
    setIsLoading(true);
    
    const newStatus = status === 'online' ? 'offline' : 'online';
    
    // Здесь потом будет запрос на бэкенд
    // await api.post('/trainer/status', { status: newStatus });
    
    setStatus(newStatus);
    setIsLoading(false);
  };

  return (
    <TrainerStatusContext.Provider value={{
      status,
      toggleStatus,
      isLoading,
    }}>
      {children}
    </TrainerStatusContext.Provider>
  );
};