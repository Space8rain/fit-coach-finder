import { useEffect, useState } from "react";
// import { z } from "zod";
import { toast } from "react-toastify";
import { APP_NAME } from "@/config/app";
import styles from "./ProfileWizard.module.css";
import InputField from "@/components/shared/onboarding/Fields/InputField/InputField";
import SelectRole from "@/components/shared/onboarding/SelectRole/SelectRole";
import type { Field, ProfileFormData } from "@/types/InputField";
import { useTelegram } from "@/hooks/useTelegram";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types/user";

type ErrorMap = Record<string, string | undefined>;

const fields: Record<"client" | "coach", Field[]> = {
  client: [
    { name: "firstName", label: "Имя", type: "text", required: true },
    { name: "lastName", label: "Фамилия", type: "text", required: true },
    { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (999) 123-45-67" },
    { name: "email", label: "E-mail", type: "email", required: false, placeholder: "example@example.com" },
    { name: "age", label: "Возраст", type: "date", required: false },
    { name: "sex", label: "Пол", type: "select", options: [{'value': 'm', 'title': 'М'}, {'value': 'w', 'title': 'Ж'}], required: true },
  ],
  coach: [
    { name: "firstName", label: "Имя", type: "text", required: true },
    { name: "lastName", label: "Фамилия", type: "text", required: true },
    { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (999) 123-45-67" },
    { name: "email", label: "E-mail", type: "email", required: false, placeholder: "example@example.com" },
    { name: "age", label: "Возраст", type: "date", required: false },
    { name: "sex", label: "Пол", type: "select", options: [{'value': 'm', 'title': 'М'}, {'value': 'w', 'title': 'Ж'}], required: true },
    { name: "price", label: "Цена за занятие", type: "text", required: true },
  ],
};

export default function ProfileWizard() {
  const tgWebApp = useTelegram();
  const { setUser } = useAuth();
  
  const [data, setData] = useState<ProfileFormData>({ role: null });
  const [errors, setErrors] = useState<ErrorMap>({});

  useEffect(() => {
    if (tgWebApp?.initDataUnsafe?.user) {
      const user = tgWebApp.initDataUnsafe.user;

      setData(prev => ({
        ...prev,
        firstName: user.first_name,
        lastName: user.last_name,
      }));
    }
  }, [tgWebApp, data.role]);

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
    // toast.info("Информация", { position: "bottom-right" });
    // toast.warning("Предупреждение", { position: "bottom-right" });
    // toast.error("Ошибка при сохранении!", { position: "bottom-right" });

    let mockUser = (tgWebApp?.initDataUnsafe?.user ?? null) as User | null;

    mockUser = {
      ...mockUser,
      first_name: data.firstName ?? mockUser?.first_name ?? "",
      last_name: data.lastName ?? mockUser?.last_name ?? "",
      phone: data.phone ?? undefined,
      email: data.email ?? undefined,
      role: data.role ?? undefined,
    }  as User;

    setUser(mockUser);
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
                name={field.name}
                required={field.required}
                label={field.label}
                type={field.type}
                value={data[field.name] ?? ""}
                onChange={v => handleFieldChange(field.name, v)}
                error={errors[field.name]}
                placeholder={field.placeholder}
                options={field.options}
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