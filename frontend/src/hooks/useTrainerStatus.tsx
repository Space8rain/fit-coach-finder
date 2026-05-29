import { useContext } from "react";
import { TrainerStatusContext } from "../context/TrainerStatusContext";

export const useTrainerStatus = () => {
  const context = useContext(TrainerStatusContext);
  if (!context) {
    throw new Error('useTrainerStatus must be used within TrainerStatusProvider');
  }
  return context;
};