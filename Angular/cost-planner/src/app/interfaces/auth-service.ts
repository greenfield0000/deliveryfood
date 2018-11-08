import { AuthFormData } from '../classes/auth-formdata';
import { Observable } from 'rxjs';

export interface AuthService {

    /**
   * Выйти из системы
   */
    signOut(authFormData: AuthFormData, url?: string): Observable<any>;

    /**
     * Войти в систему
     */
    signIn(authFormData: AuthFormData, url?: string): Observable<any>;

    /**
     * Зарегистрироваться в системе
     */
    registry(authFormData: AuthFormData, url?: string): Observable<any>;

}
