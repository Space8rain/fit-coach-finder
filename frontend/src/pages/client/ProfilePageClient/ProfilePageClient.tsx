import { useAuth } from "@/hooks/useAuth";
import styles from "./ProfilePageClient.module.css";
import { fieldsProfile } from "@/config/fields";
import InputField from "@/components/shared/onboarding/Fields/InputField/InputField";

export default function ProfilePageClient() {
  const { user } = useAuth();

  if (!user || !user.role) {
    return <div>Загрузка профиля...</div>;
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    console.log(user);
    console.log(`Field ${fieldName} changed to ${value} `);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>Профиль</span>
        </header>

        <>
          {!user || !user.role ? 
            <div>Загрузка данных...</div>
          :
            fieldsProfile[user.role].map(field => (
              <InputField
                key={field.name}
                name={field.name}
                required={field.required}
                label={field.label}
                type={field.type}
                value={(user[field.name as keyof typeof user] as string) ?? ""}
                onChange={v => handleFieldChange(field.name, v)}
                placeholder={field.placeholder}
                options={field.options}
              />
            ))
          }
        </>
        
      </div>
    </div>

  )
}