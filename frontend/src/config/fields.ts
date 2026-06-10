import type { Field } from "@/types/InputField";

export const fieldsProfile: Record<"client" | "coach", Field[]> = {
  client: [
    { name: "firstName", label: "Имя", type: "text", required: true },
    { name: "lastName", label: "Фамилия", type: "text", required: true },
    { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (999) 123-45-67" },
    { name: "email", label: "E-mail", type: "email", required: false, placeholder: "example@example.com" },
    { name: "birthDate", label: "Дата рождения", type: "date", required: false },
    { name: "sex", label: "Пол", type: "select", options: [{'value': 'm', 'title': 'М'}, {'value': 'w', 'title': 'Ж'}], required: true },
  ],
  coach: [
    { name: "firstName", label: "Имя", type: "text", required: true },
    { name: "lastName", label: "Фамилия", type: "text", required: true },
    { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (999) 123-45-67" },
    { name: "email", label: "E-mail", type: "email", required: false, placeholder: "example@example.com" },
    { name: "birthDate", label: "Дата рождения", type: "date", required: false },
    { name: "sex", label: "Пол", type: "select", options: [{'value': 'm', 'title': 'М'}, {'value': 'w', 'title': 'Ж'}], required: true },
    { name: "price", label: "Цена за занятие", type: "text", required: true },
  ],
};
