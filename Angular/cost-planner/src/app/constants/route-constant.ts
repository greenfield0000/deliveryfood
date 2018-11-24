
/**
 * Константы для роутинга запросов
 */
export class RouteConstant {
    // запросы к модулю авторизации, регистрации, логину и т.д.
    public static readonly auth_location = 'http://localhost:8081/auth';
    // главная страница, при авторизованном пользователе
    public static readonly dash_location = 'http://localhost:8081/dashbord';
}
