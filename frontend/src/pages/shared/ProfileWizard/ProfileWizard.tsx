import { useState } from "react";
// import { z } from "zod";
import { toast } from "react-toastify";
import { APP_NAME } from "@/config/app";
import styles from "./ProfileWizard.module.css";
import InputField from "@/components/shared/onboarding/Fields/InputField/InputField";
import SelectRole from "@/components/shared/onboarding/SelectRole/SelectRole";
import type { Field, ProfileFormData } from "@/types/InputField";

type ErrorMap = Record<string, string | undefined>;

const fields: Record<"client" | "coach", Field[]> = {
  client: [
    { name: "name", label: "Имя", type: "text", required: true },
    { name: "age", label: "Возраст", type: "number", required: true },
    { name: "goals", label: "Цели", type: "text", required: true },
  ],
  coach: [
    { name: "name", label: "Имя", type: "text", required: true },
    { name: "age", label: "Возраст", type: "number", required: true },
    { name: "specialization", label: "Специализация", type: "text", required: true },
    { name: "experience", label: "Опыт (лет)", type: "number", required: true },
  ],
};

export default function ProfileWizard() {
  const [data, setData] = useState<ProfileFormData>({ role: null });
  const [errors, setErrors] = useState<ErrorMap>({});

  // const validate = () => {
  //   if (!data.role) return false;

  //   const roleFields = fields[data.role];
  //   const newErrors: ErrorMap = {};

  //   for (const f of roleFields) {
  //     const value = data[f.name];
  //     if (f.required && (value === undefined || value === "")) {
  //       newErrors[f.name] = "Поле обязательно";
  //     }
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleFinish = () => {
    // if (!validate()) return;

    console.log("FINAL DATA:", data);

    toast.success("Успешно сохранено!", { position: "bottom-right" });
    toast.info("Информация", { position: "bottom-right" });
    toast.warning("Предупреждение", { position: "bottom-right" });
    toast.error("Ошибка при сохранении!", { position: "bottom-right" });
  };

  const handleFieldChange = (name: string, value: string | number) => {
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>{APP_NAME}</span>
        </header>

        {!data.role && (
          <SelectRole data={data} setData={setData} />
        )}

        {data.role && (
          <div>
            {fields[data.role].map(field => (
              <InputField
                key={field.name}
                label={field.label}
                type={field.type}
                value={data[field.name] ?? ""}
                onChange={v => handleFieldChange(field.name, v)}
                error={errors[field.name]}
              />
            ))}

            <div className={styles.buttons}>
              <button
                className={styles.button}
                onClick={() => {
                  setData({ role: null });
                  setErrors({});
                }}
              >
                <span className={styles.arrowLeft}>←</span>
                Назад
              </button>

              <button
                className={styles.button}
                onClick={handleFinish}
                // disabled={!validate()}
              >
                Завершить
                <span className={styles.arrowRight}>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}