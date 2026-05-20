import { APP_NAME } from "../../config/app";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden">

        <header className="px-6 py-5 bg-black/30 flex items-center gap-3">
          <span className="font-display text-text-primary text-lg tracking-wide">{APP_NAME}</span>
        </header>

        <div className="flex flex-col items-center gap-3 px-6 py-12 bg-bg-accent">
          <h1 className="font-display text-6xl text-text-primary mt-2 mb-1">404</h1>
          <p className="font-display text-text-primary text-lg tracking-wide ml-4">Страница не найдена</p>
        </div>

        <div className="px-6 py-4 bg-black/20 min-h-[48px] flex items-center justify-center ">
          <a href="/" className="font-display text-text-primary text-lg tracking-wide hover:brightness-110 transition-all duration-200 group flex items-center gap-2">
            На главную
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}