package greenfield.group.com.authservice.services;

import api.Account;
import api.AccountRole;
import api.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import greenfield.group.com.authservice.dto.response.LoginAccountResponseDTO;
import greenfield.group.com.security.common.SimpleResult;
import greenfield.group.com.security.common.Status;
import greenfield.group.com.security.repository.AccountRepository;
import greenfield.group.com.security.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

import static pattern.PatternConstant.GUID_PATTERN;

/**
 * Сервис по работе с аккаунтом
 */
@Service
public class AuthService {

    private static final boolean AUTHTORIZE = true;
    private static final boolean NON_AUTHORIZED = false;

    private final ObjectMapper objectMapper;
    private final AccountRepository accountRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(ObjectMapper objectMapper,
                       AccountRepository accountRepository,
                       JwtTokenProvider jwtTokenProvider) {
        this.objectMapper = objectMapper;
        this.accountRepository = accountRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * Залогиниться
     *
     * @param account
     * @return
     */
    public SimpleResult<LoginAccountResponseDTO> signIn(Account account) {
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
        LoginAccountResponseDTO loginAccountResponseDTO = LoginAccountResponseDTO.accountToDTO(account);
        loginAccountResponseDTO.setToken(jwtTokenProvider.createToken(
                loginAccountResponseDTO.getLogin(),
                Arrays.asList(loginAccountResponseDTO.getAccountRole())
        ));
        return new SimpleResult<>(Status.OK, loginAccountResponseDTO);
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
        setAuthtorized(account, NON_AUTHORIZED);
        accountRepository.save(account);
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
            setAuthtorized(account, NON_AUTHORIZED);
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
    public Role getAccountRoleSysNameByUUID(String jsonUuid) {
        String uuid = "";
        try {
            Map<String, Object> mappedvalues = objectMapper.readValue(
                    jsonUuid, objectMapper.constructType(Map.class)
            );
            if ((mappedvalues != null) && (mappedvalues.get("uuid") != null)) {
                uuid = mappedvalues.get("uuid").toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        final Role emptyRole = new Role();
        if ((uuid == null) || (uuid.isEmpty()) || !uuidMachesPattern(uuid)) {
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
    private boolean uuidMachesPattern(String uuid) {
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

        finderAccount.setIsAuthtorised(isAuth);

        return finderAccount;
    }
}
