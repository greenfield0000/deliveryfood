package greenfield.group.com.authservice.services;

import entities.account.Account;
import enums.Status;
import greenfield.group.com.authservice.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import results.SimpleResult;

import java.util.Optional;

/**
 * Сервис по работе с аккаунтом
 */
@Service
public class AccountService {

    private static final boolean AUTHTORIZE = true;
    private static final boolean NON_AUTHTORIZE = false;

    @Autowired
    private AccountRepository accountRepository;

    /**
     * Залогиниться
     *
     * @param account
     * @return
     */
    public SimpleResult<Account> signIn(Account account) {
        // Должен быть известен логин и пароль
        if ((account == null) || ((account.getLogin() == null) || (account.getLogin().isEmpty()))
                || ((account.getPassword() == null) || (account.getPassword().isEmpty()))) {
            return new SimpleResult<>(Status.ERROR, "Ошибка авторизации", null);
        }

        Optional<Account> finderAccount = accountRepository
                .findByLoginAndPassword(account.getLogin(), account.getPassword());

        // если пытаемся залогиниться под пользователем, которого нет
        if (!finderAccount.isPresent()) {
            return new SimpleResult<>(Status.ERROR, "Ошибка авторизации", null);
        }

        account = finderAccount.get();
        setAuthtorized(account, AUTHTORIZE);
        accountRepository.save(account);
        return new SimpleResult<>(Status.OK, account);
    }

    /**
     * Разлогиниться
     *
     * @param account
     * @return
     */
    public SimpleResult<Account> signOut(Account account) {
        // Должен быть известен логин и пароль
        if ((account == null) || ((account.getLogin() == null) || (account.getLogin().isEmpty()))
                || ((account.getPassword() == null) || (account.getPassword().isEmpty()))) {
            return new SimpleResult<>(Status.ERROR, "Невозможно выполнить данное действие", null);
        }
        Optional<Account> finderAccount = accountRepository
                .findByLoginAndPassword(account.getLogin(), account.getPassword());

        // если пытаемся залогиниться под пользователем, которого нет
        if (!finderAccount.isPresent()) {
            return new SimpleResult<>(Status.ERROR, "Невозможно выполнить данное действие", null);
        }

        account = finderAccount.get();
        setAuthtorized(account, NON_AUTHTORIZE);
        accountRepository.save(account);
        return new SimpleResult<>(Status.OK, account);
    }

    /**
     * Зарегистрироваться
     *
     * @param account
     * @return
     */
    public SimpleResult<Account> registry(Account account) {
        // Должен быть известен логин и пароль
        if ((account == null) || ((account.getLogin() == null) || (account.getLogin().isEmpty()))
                || ((account.getPassword() == null) || (account.getPassword().isEmpty()))) {
            return new SimpleResult<>(Status.ERROR, "Недостаточно данных для регистрации, попробуйте еще раз.", null);
        }

        // найдем пользователя с таким именем
        Optional<Account> finderAccount = accountRepository.findByLogin(account.getLogin());
        // если не нашли
        if (!finderAccount.isPresent()) {
            setAuthtorized(account, NON_AUTHTORIZE);
            accountRepository.save(account);
            return new SimpleResult<>(Status.OK, account);
        }

        return new SimpleResult<>(Status.ERROR, "Пользователь с таким логином уже существует, выберите другое имя", null);
    }

    /**
     * Установка признака авторизации у пользователя
     *
     * @param account
     * @param isAuth
     * @return
     */
    private Account setAuthtorized(Account account, boolean isAuth) {
        // берем либо существующего, либо того, которого запрашиваем
        Account finderAccount = Optional.of(accountRepository
                .findByLoginAndPassword(account.getLogin(), account.getPassword())
                .orElse(account))
                .get();

        finderAccount.setAuthtorise(isAuth);

        return finderAccount;
    }
}
