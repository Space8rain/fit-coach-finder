import { useEffect } from "react";
import { useTelegram } from "./useTelegram";

export function useTelegramInit() {
    const tg = useTelegram();

    useEffect(() => {
        if (!tg) {
            console.warn("Running outside Telegram. Using mock WebApp.");
            return;
        }

        try {
            tg.ready();
            tg.expand();
            // tg.viewportHeight = window.innerHeight;

            console.log("Telegram WebApp initialized");
            // console.log("InitData:", tg.initDataUnsafe);
        } catch (err) {
            console.error("Failed to initialize Telegram WebApp:", err);
        }
    }, [tg]);
}
