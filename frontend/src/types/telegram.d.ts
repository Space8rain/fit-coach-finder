interface TelegramWebAppThemeParams {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
}

interface TelegramWebAppBackButton {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
}

interface TelegramWebAppMainButton {
    isVisible: boolean;
    setText(text: string): void;
    show(): void;
    hide(): void;
    enable(): void;
    offClick(): void;
    onClick(callback: () => void): void;
}

interface TelegramWebAppHapticFeedback {
    impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
    notificationOccurred(type: "error" | "success" | "warning"): void;
    selectionChanged(): void;
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramInitDataUnsafe;

    colorScheme: "light" | "dark";
    themeParams: TelegramWebAppThemeParams;

    isExpanded: boolean;
    viewportHeight?: number;
    viewportStableHeight?: number;
    platform?: "android" | "ios" | "web" | "unknown";

    isVerticalSwipesEnabled: boolean;        // true по умолчанию
    disableVerticalSwipes: () => void;
    enableVerticalSwipes: () => void;

    ready(): void;
    expand(): void;
    close(): void;

    onEvent(event: string, handler: (payload?: unknown) => void): void;
    offEvent(event: string): void;

    MainButton: TelegramWebAppMainButton;
    BackButton: TelegramWebAppBackButton;
    HapticFeedback: TelegramWebAppHapticFeedback;

    // DEV-only расширения
    __mockEvents?: Record<string, (payload?: unknown) => void>;
    __trigger?(event: string, payload?: unknown): void;
    openTelegramLink(url: string): void;

}

interface TelegramInitDataUnsafe {
    user?: TelegramUser;
    auth_date: number;
    hash: string;
    query_id?: string;
    start_param?: string;
    can_send_after?: number;
}

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;

    is_premium?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;

    // если Mini App запущен через inline mode
    added_to_attachment_menu?: boolean;
}


interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}
