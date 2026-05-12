import { useEffect, useState } from "react";

export type DeviceType = "ios" | "android" | "web";

export function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>("web");

  useEffect(() => {
    const detect = (): DeviceType => {
      // безопасно типизируем Telegram
      const tg = window?.Telegram?.WebApp;
      const platform = tg?.platform?.toLowerCase();

      // 1) через Telegram
      if (platform) {
        if (platform.includes("ios")) return "ios";
        if (platform.includes("android")) return "android";
        return "web"; // tdesktop / web / unknown
      }

      // 2) fallback через userAgent
      const ua = navigator.userAgent.toLowerCase();

      if (/iphone|ipad|ipod/.test(ua)) return "ios";
      if (/android/.test(ua)) return "android";

      return "web";
    };

    requestAnimationFrame(() => {
      setDevice(detect());
    });
  }, []);

  return device;
}
