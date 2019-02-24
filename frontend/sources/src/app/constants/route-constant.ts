
/**
 * Константы для роутинга запросов
 */
export class RouteConstant {
    // запросы к модулю авторизации, регистрации, логину и т.д.
    public static readonly auth_location = 'http://localhost:8081/auth';
    // главная страница, при авторизованном пользователе
    public static readonly menu_location = 'http://localhost:8082/menu/getMenu';
}
