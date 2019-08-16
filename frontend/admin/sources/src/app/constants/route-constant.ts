
/**
 * Константы для роутинга запросов
 */
export class RouteConstant {
    // запросы к модулю авторизации, регистрации, логину и т.д.
    public static readonly auth_location = 'http://localhost:8081/auth';
    // запросы к модулю меню
    public static readonly menu_location = 'http://localhost:8082/menu';
    // запросы к модулю журнала
    public static readonly journal_location = 'http://localhost:8083/journal';
    // запросы к модулю кладр
    public static readonly kladr_location = 'http://localhost:8084/kladr';
}
