import { AccountEntity } from '../classes/accountEntity';

import { Observable } from 'rxjs';

export interface Auth {

    /**
   * Выйти из системы
   */
    signOut(accountEntity: AccountEntity, url?: string): Observable<AccountEntity>;

    /**
     * Войти в систему
     */
    signIn(accountEntity: AccountEntity, url?: string): Observable<AccountEntity>;

    /**
     * Зарегистрироваться в системе
     */
    registry(accountEntity: AccountEntity, url?: string): Observable<AccountEntity>;

}
