import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Ошибка";
  let message = "Что-то пошло не так.";

  // Ошибки, брошенные через throw new Response()
  if (isRouteErrorResponse(error)) {
    title = `Ошибка ${error.status}`;
    message = error.statusText || "Неизвестная ошибка";
  }

  // Обычные JS ошибки
  else if (error instanceof Error) {
    message = error.message;
  }

  // Непредвиденные случаи
  else if (typeof error === "string") {
    message = error;
  }

  return (
    <div style={{
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700 }}>{title}</h1>
      <p style={{ opacity: 0.8 }}>{message}</p>

      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#007aff",
          color: "white",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Обновить страницу
      </button>
    </div>
  );
}
