import { AccountEntity } from '../classes/accountEntity';

import { Observable } from 'rxjs';
import { SimpleResult } from '../utils/simple-result.class';

export interface Auth {

    /**
   * Выйти из системы
   */
    signOut(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>>;

    /**
     * Войти в систему
     */
    signIn(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>>;

    /**
     * Зарегистрироваться в системе
     */
    registry(accountEntity: AccountEntity, url?: string): Observable<SimpleResult<AccountEntity>>;

}
