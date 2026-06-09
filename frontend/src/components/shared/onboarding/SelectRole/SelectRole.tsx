import styles from "./SelectRole.module.css";
import { RoleCard } from "./RoleCard";
import type { ProfileFormData } from "@/types/InputField";

type SelectRoleProps = {
  data: ProfileFormData;
  setData: (data: ProfileFormData) => void;
};

export default function SelectRole({ data, setData }: SelectRoleProps) {

const handleSelect = (role: "client" | "coach") => {
    setData({ 
      ...data, 
      role,
      name: undefined,
      age: undefined,
      goals: undefined,
      specialization: undefined,
      experience: undefined,
    });
  };

  return (
    <div className={styles.cards}>
      <RoleCard
        title="Я клиент"
        description="Найди своего тренера и достигай целей."
        onSelect={() => handleSelect("client")}
      />
      <RoleCard
        title="Я тренер"
        description="Найди клиентов, и развивай свой бренд."
        onSelect={() => handleSelect("coach")}
      />
    </div>
  );
}
