export function injectTelegramMocks() {
    console.warn("[MOCK] Injecting minimal Telegram WebApp mocks");

    const user = {
        id: 123456,
        first_name: "MockUser_first_name",
        last_name: "Dev_last_name",
        username: "mock_dev_username",
        language_code: "en",
        photo_url: "https://avatarko.ru/img/kartinka/1/Crazy_Frog.jpg",
    };

    const initData = new URLSearchParams({
        user: JSON.stringify(user),
        auth_date: String(Math.floor(Date.now() / 1000)),
        hash: "mock_hash",
    }).toString();

    const initDataUnsafe = {
        user,
        auth_date: Math.floor(Date.now() / 1000),
        hash: "mock_hash",
    };

    const WebApp: TelegramWebApp = {
        initData,
        initDataUnsafe,
        // platform: "android",

        colorScheme: "dark",
        themeParams: {
            bg_color: "#1c1c1e",
            text_color: "#ffffff",
            hint_color: "#999999",
            link_color: "#2481cc",
            button_color: "#2481cc",
            button_text_color: "#ffffff",
        },

        isExpanded: true,
        // viewportHeight: 800,
        // viewportStableHeight: 800,

        ready() {
            console.log("[MOCK] WebApp.ready()");
        },

        expand() {
            console.log("[MOCK] WebApp.expand()");
        },

        close() {
            console.log("[MOCK] WebApp.close()");
        },

        openTelegramLink(url: string) {
            console.log("[MOCK] openTelegramLink:", url);
            window.open(url, "_blank");
        },

        // пустые заглушки, чтобы TS не ругался
        onEvent() { },
        offEvent() { },

        isVerticalSwipesEnabled: true,
        disableVerticalSwipes: () => {},
        enableVerticalSwipes: () => {},

        MainButton: {
            isVisible: false,
            setText() { },
            show() { },
            hide() { },
            enable() { },
            onClick() { },
            offClick() { },
        },

        BackButton: {
            isVisible: false,
            show() { },
            hide() { },
            onClick() { },
        },

        HapticFeedback: {
            impactOccurred() { },
            notificationOccurred() { },
            selectionChanged() { },
        },
    };

    window.Telegram = { WebApp };

    console.log("[MOCK] Minimal Telegram WebApp mock installed");
}
