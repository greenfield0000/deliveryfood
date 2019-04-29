package greenfield.group.com.authservice.services;

import entities.authservice.Account;
import entities.authservice.Role;
import enums.AccountRole;
import enums.Status;
import greenfield.group.com.authservice.repositories.AccountRepository;
import greenfield.group.com.authservice.session.sessionimpl.AccountRedisSessionImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import results.SimpleResult;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

/**
 * Сервис по работе с аккаунтом
 */
@Service
public class AccountService {

    public static final String GUID_PATTERN = "([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}";
    private static final boolean AUTHTORIZE = true;
    private static final boolean NON_AUTHTORIZE = false;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccountRedisSessionImpl accountRedisSessionImpl;

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
        accountRedisSessionImpl.sessionSave(account, 20L, TimeUnit.SECONDS);
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
        accountRedisSessionImpl.sessionDelete(account);
        return new SimpleResult<>(Status.OK, account);
    }

    /**
     * Зарегистрироваться
     *
     * @param account
     * @return
     */
    @Transactional
    public SimpleResult<Account> registry(Account account) {
        // Должен быть известен логин и пароль
        if ((account == null) || ((account.getLogin() == null) || (account.getLogin().isEmpty()))
                || ((account.getPassword() == null) || (account.getPassword().isEmpty()))) {
            return new SimpleResult<>(Status.ERROR, "Недостаточно данных для регистрации, попробуйте еще раз.", null);
        }

        // найдем пользователя с таким именем
        Optional<Account> finderAccount = accountRepository.findByLogin(account.getLogin());
        // если не нашли, то значит это не повторная регистрация
        if (!finderAccount.isPresent()) {
            // тогда регистрируем и выходим
            setAuthtorized(account, NON_AUTHTORIZE);
            account.setUuid(UUID.randomUUID().toString());
            AccountRole accountRole = AccountRole.WAITER;
            Role role = account.getAccountRole();
            if (role == null) {
                role = new Role();
            }
            role.setName(accountRole.getName());
            role.setSysname(accountRole.getSysname());
            account.setAccountRole(role);
            final Account savedAccount = accountRepository.saveAndFlush(account);
            accountRedisSessionImpl.sessionSave(account, 20L, TimeUnit.SECONDS);
            return new SimpleResult<>(Status.OK, savedAccount);
        }

        return new SimpleResult<>(Status.OK, account);
    }

    /**
     * Получить роль аккаунта по UUID
     *
     * @param
     * @return
     */
    public Role getAccountRoleSysNameByUUID(String uuid) {
        final Role emptyRole = new Role();
        if ((uuid == null) || (uuid.isEmpty()) || !uuidMachetPattern(uuid)) {
            return emptyRole;
        }
        // Грузим пользователя с таким uuid
        final Optional<Account> byUUIDAccount = accountRepository
                .findByUuid(uuid);
        // Если null или не нашли
        return byUUIDAccount
                .map(Account::getAccountRole)
                .orElse(emptyRole);
    }

    /**
     * Метод, проверяющий маску uuid
     *
     * @param uuid
     * @return
     */
    private boolean uuidMachetPattern(String uuid) {
        return Pattern
                .compile(GUID_PATTERN)
                .matcher(uuid)
                .matches();
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

        finderAccount.setAuthtorised(isAuth);

        return finderAccount;
    }
}
