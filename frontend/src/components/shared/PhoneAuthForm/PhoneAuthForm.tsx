import { useState } from "react";
import { postAuth } from "../../api/auth";

interface Props {
  onSuccess: (token: string) => void;
}

export function PhoneAuthForm({ onSuccess }: Props) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      await postAuth(JSON.stringify({ phone, action: "send_otp" }));
      setStep("otp");
    } catch {
      setError("Не удалось отправить код");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: unknown = await postAuth(
        JSON.stringify({ phone, code, action: "verify_otp" })
      );
      onSuccess((res as { data: { token: string } }).data.token);
    } catch {
      setError("Неверный код");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {step === "phone" ? (
        <>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+7 999 123 45 67"
            type="tel"
          />
          <button onClick={sendOtp} disabled={loading}>
            {loading ? "Отправка..." : "Получить код"}
          </button>
        </>
      ) : (
        <>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Код из SMS"
            type="text"
            inputMode="numeric"
          />
          <button onClick={verifyOtp} disabled={loading}>
            {loading ? "Проверка..." : "Войти"}
          </button>
        </>
      )}
    </div>
  );
}